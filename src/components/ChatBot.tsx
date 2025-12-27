// components/ChatBot.tsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import type { FormEvent } from "react";
import {
  FaPaperPlane,
  FaUser,
  FaRobot,
  FaSpinner,
  FaChevronDown,
  FaTimes,
  FaExpand,
  FaCompress,
  FaShieldAlt,
  FaSync,
  FaInfoCircle,
  FaUserSecret,
  FaLock,
  FaCopy,
  FaArrowUp,
  FaChevronUp,
} from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";

// Types
interface Message {
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  isLoading?: boolean;
}

interface ChatHistoryResponse {
  status: number;
  data: {
    messages: Message[];
    hasMore: boolean;
    total: number;
  };
  message: string;
}

interface ChatResponse {
  status: number;
  data: {
    reply: string;
  };
  message: string;
}

interface ChatConfig {
  sessionId?: string;
  initialMessage?: string;
  userId?: string;
}

interface ChatBotProps {
  config?: Partial<ChatConfig>;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  theme?: {
    primary?: string;
    secondary?: string;
    background?: string;
    text?: string;
    accent?: string;
  };
}

// Default configuration
const defaultConfig: ChatConfig = {
  initialMessage: "👋 Hello! I'm your AI assistant. How can I help you today?",
};

// Session Manager with UUID
class SessionManager {
  private static SESSION_KEY = "chatbot_session_uuid";
  private static USER_ID_KEY = "chatbot_user_uuid";
  private static VISIT_COUNT_KEY = "chatbot_visit_count";

  // Generate UUID-based session ID
  static generateSessionId(): string {
    return `${uuidv4()}`;
  }

  // Generate UUID user ID
  static getOrCreateUserId(): string {
    let userId = localStorage.getItem(this.USER_ID_KEY);
    if (!userId) {
      userId = `${uuidv4()}`;
      localStorage.setItem(this.USER_ID_KEY, userId);

      // Increment visit count
      let visitCount = parseInt(
        localStorage.getItem(this.VISIT_COUNT_KEY) || "0"
      );
      visitCount++;
      localStorage.setItem(this.VISIT_COUNT_KEY, visitCount.toString());
    }
    return userId;
  }

  // Get visit count
  static getVisitCount(): number {
    return parseInt(localStorage.getItem(this.VISIT_COUNT_KEY) || "0");
  }

  // Get current session ID
  static getCurrentSessionId(): string {
    let sessionId = sessionStorage.getItem(this.SESSION_KEY);
    if (!sessionId) {
      sessionId = this.generateSessionId();
      sessionStorage.setItem(this.SESSION_KEY, sessionId);
    }
    return sessionId;
  }

  // Clear session
  static clearSession() {
    sessionStorage.removeItem(this.SESSION_KEY);
  }

  // Get client IP
  static async getClientIP(): Promise<string> {
    try {
      const response = await fetch("https://api.ipify.org?format=json", {
        signal: AbortSignal.timeout(3000),
      });
      if (response.ok) {
        const data = await response.json();
        return data.ip;
      }
      throw new Error("IP service failed");
    } catch {
      return `anon_${uuidv4().slice(0, 8)}`;
    }
  }

  // Get comprehensive client info
  static async getClientInfo() {
    const ip = await this.getClientIP();
    const sessionId = this.getCurrentSessionId();
    const userId = this.getOrCreateUserId();
    const visitCount = this.getVisitCount();

    return {
      sessionId,
      userId,
      ip,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      visitCount,
      timestamp: new Date().toISOString(),
    };
  }

  // Copy to clipboard
  static async copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }
}

// Custom hook for chat API
const useChatAPI = (config: ChatConfig) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>("");
  const [clientInfo, setClientInfo] = useState<any>(null);
  const [isSessionInitialized, setIsSessionInitialized] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Initialize session
  useEffect(() => {
    const initializeSession = async () => {
      try {
        // Use provided session ID or generate new one
        const sid = config.sessionId || SessionManager.getCurrentSessionId();
        setSessionId(sid);

        // Get comprehensive client info
        const info = await SessionManager.getClientInfo();
        setClientInfo(info);
        setIsSessionInitialized(true);

        console.log("Chat session initialized:", {
          sessionId: sid,
          userId: info.userId,
          visitCount: info.visitCount,
        });
      } catch (err) {
        console.error("Failed to initialize session:", err);
        setError("Failed to initialize chat session");
      }
    };

    initializeSession();
  }, [config.sessionId]);

  const fetchMessages = async (
    offset: number = 0,
    limit: number = 4
  ): Promise<{ messages: Message[]; hasMore: boolean }> => {
    try {
      if (!isSessionInitialized) {
        throw new Error("Session not initialized");
      }

      setIsLoading(true);
      setError(null);

      const response = await fetch(`${baseUrl}/api/chat/history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          offset,
          limit,
          clientInfo,
          userId: SessionManager.getOrCreateUserId(),
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatHistoryResponse = await response.json();

      if (data.status !== 200) {
        throw new Error(data.message || "Failed to fetch messages");
      }

      // Return messages in chronological order (oldest to newest)
      // The API returns newest first, so we reverse it for chronological order
      const chronologicalMessages = [...data.data.messages].reverse();

      return {
        messages: chronologicalMessages,
        hasMore: data.data.hasMore,
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch messages";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (query: string): Promise<string> => {
    try {
      if (!isSessionInitialized) {
        throw new Error("Session not initialized");
      }

      setIsLoading(true);
      setError(null);

      const response = await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          query,
          clientInfo,
          userId: SessionManager.getOrCreateUserId(),
          timestamp: new Date().toISOString(),
          messageId: `msg_${uuidv4()}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatResponse = await response.json();

      if (data.status !== 200) {
        throw new Error(data.message || "Failed to send message");
      }

      return data.data.reply;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to send message";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetSession = () => {
    SessionManager.clearSession();
    const newSessionId = SessionManager.generateSessionId();
    sessionStorage.setItem("chatbot_session_uuid", newSessionId);
    setSessionId(newSessionId);
    return newSessionId;
  };

  return {
    fetchMessages,
    sendMessage,
    resetSession,
    sessionId,
    clientInfo,
    isSessionInitialized,
    isLoading,
    error,
  };
};

// Main ChatBot Component
const ChatBot: React.FC<ChatBotProps> = ({
  config = {},
  position = "bottom-right",
  theme = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [offset, setOffset] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isScrolledToTop, setIsScrolledToTop] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const [scrollPositionBeforeLoad, setScrollPositionBeforeLoad] = useState<{
    top: number;
    height: number;
  } | null>(null);
  const [hasScrolledOnce, setHasScrolledOnce] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);
  const loadingMoreRef = useRef(false);
  const shouldAutoScrollRef = useRef(true);

  const mergedConfig: ChatConfig = {
    ...defaultConfig,
    ...config,
  };

  const {
    fetchMessages,
    sendMessage,
    resetSession,
    sessionId,
    clientInfo,
    isSessionInitialized,
    isLoading,
    error,
  } = useChatAPI(mergedConfig);

  // Theme colors with defaults
  const themeColors = {
    primary: theme.primary || "#4f46e5",
    secondary: theme.secondary || "#7c3aed",
    background: theme.background || "#ffffff",
    text: theme.text || "#1f2937",
    accent: theme.accent || "#10b981",
  };

  // Load initial messages when chat opens
  useEffect(() => {
    if (
      isOpen &&
      isInitialLoad &&
      isSessionInitialized &&
      messages.length === 0
    ) {
      loadInitialMessages();
    }
  }, [isOpen, isInitialLoad, isSessionInitialized]);

  // Auto-scroll to bottom on initial load and new messages
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    // Only auto-scroll if:
    // 1. It's the initial load and we should start from bottom
    // 2. User has not scrolled manually
    // 3. We're adding new messages (not loading older ones)
    if (shouldAutoScrollRef.current && messages.length > 0 && !isLoadingMore) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        scrollToBottom();
        setIsScrolledToBottom(true);
      }, 100);
    }
  }, [messages, isLoadingMore]);

  // Set initial scroll to bottom when component mounts with messages
  useEffect(() => {
    if (messages.length > 0 && !hasScrolledOnce) {
      // Initial scroll to bottom when opening chat
      setTimeout(() => {
        scrollToBottom();
        setIsScrolledToBottom(true);
        setIsScrolledToTop(false);
      }, 300);
    }
  }, [messages.length, hasScrolledOnce]);

  // Restore scroll position after loading more messages
  useEffect(() => {
    if (scrollPositionBeforeLoad && messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const newScrollHeight = container.scrollHeight;
      const heightDifference =
        newScrollHeight - scrollPositionBeforeLoad.height;

      // Restore the scroll position relative to the new content
      container.scrollTop = scrollPositionBeforeLoad.top + heightDifference;

      setScrollPositionBeforeLoad(null);
      loadingMoreRef.current = false;

      // After loading older messages, don't auto-scroll
      shouldAutoScrollRef.current = false;
    }
  }, [messages, scrollPositionBeforeLoad]);

  // Copy to clipboard with feedback
  const handleCopy = async (text: string, label: string) => {
    const success = await SessionManager.copyToClipboard(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Load initial messages - start from bottom
  const loadInitialMessages = async () => {
    try {
      setIsInitialLoad(true);
      const { messages: initialMessages, hasMore } = await fetchMessages(0, 4);

      if (initialMessages.length > 0) {
        setMessages(initialMessages);
        setOffset(initialMessages.length);
        setHasMoreMessages(hasMore);

        // We'll scroll to bottom in the useEffect above
        shouldAutoScrollRef.current = true;
      } else {
        const welcomeMessage: Message = {
          role: "assistant",
          content:
            mergedConfig.initialMessage ||
            "👋 Hello! I'm your AI assistant. How can I help you today?",
          createdAt: new Date().toISOString(),
        };
        setMessages([welcomeMessage]);
        setHasMoreMessages(false);

        // Scroll to bottom for welcome message too
        shouldAutoScrollRef.current = true;
      }
    } catch (err) {
      console.error("Failed to load initial messages:", err);
      // Show welcome message even on error
      const welcomeMessage: Message = {
        role: "assistant",
        content:
          mergedConfig.initialMessage ||
          "👋 Hello! I'm your AI assistant. How can I help you today?",
        createdAt: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
      setHasMoreMessages(false);

      shouldAutoScrollRef.current = true;
    } finally {
      setIsInitialLoad(false);
    }
  };

  // Load more messages (older messages)
  const loadMoreMessages = useCallback(async () => {
    if (loadingMoreRef.current || !hasMoreMessages || isLoadingMore) return;

    try {
      loadingMoreRef.current = true;
      setIsLoadingMore(true);

      // Save current scroll position before loading
      const container = messagesContainerRef.current;
      if (container) {
        setScrollPositionBeforeLoad({
          top: container.scrollTop,
          height: container.scrollHeight,
        });
      }

      const { messages: olderMessages, hasMore } = await fetchMessages(
        offset,
        10
      );

      if (olderMessages.length > 0) {
        // Older messages should be added to the beginning (chronological order)
        setMessages((prev) => [...olderMessages, ...prev]);
        setOffset((prev) => prev + olderMessages.length);
        setHasMoreMessages(hasMore);
      } else {
        setHasMoreMessages(false);
      }
    } catch (err) {
      console.error("Failed to load more messages:", err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [offset, hasMoreMessages, isLoadingMore, fetchMessages]);

  // Handle scroll for tracking position
  const handleScroll = useCallback(() => {
    if (!messagesContainerRef.current) return;

    const container = messagesContainerRef.current;
    const { scrollTop, scrollHeight, clientHeight } = container;

    // Track if user has scrolled manually
    if (!hasScrolledOnce && scrollTop < scrollHeight - clientHeight - 10) {
      setHasScrolledOnce(true);
      // User has scrolled manually, don't auto-scroll anymore
      shouldAutoScrollRef.current = false;
    }

    // Check if user is at the top (for showing load more button)
    const atTop = scrollTop === 0;
    setIsScrolledToTop(atTop);

    // Check if user is at the bottom
    const atBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10;
    setIsScrolledToBottom(atBottom);

    // If user scrolls to bottom after manual scrolling, re-enable auto-scroll for new messages
    if (atBottom && hasScrolledOnce) {
      shouldAutoScrollRef.current = true;
    }
  }, [hasScrolledOnce]);

  // Send message
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: inputValue,
      createdAt: new Date().toISOString(),
    };

    const loadingMessage: Message = {
      role: "assistant",
      content: "",
      createdAt: new Date().toISOString(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInputValue("");

    try {
      const reply = await sendMessage(inputValue);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.isLoading
            ? {
                role: "assistant",
                content: reply,
                createdAt: new Date().toISOString(),
              }
            : msg
        )
      );

      // Auto-scroll to bottom after sending message
      shouldAutoScrollRef.current = true;
      setIsScrolledToBottom(true);
    } catch (err) {
      console.error("Failed to send message:", err);
      setMessages((prev) => prev.filter((msg) => !msg.isLoading));

      const errorMessage: Message = {
        role: "assistant",
        content: "⚠️ Sorry, I encountered an error. Please try again.",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      shouldAutoScrollRef.current = true;
      setIsScrolledToBottom(true);
    }
  };

  // Reset chat session
  const handleResetSession = () => {
    const newSessionId = resetSession();
    setMessages([]);
    setOffset(0);
    setHasMoreMessages(true);
    setIsInitialLoad(true);
    setShowSecurityInfo(false);
    setHasScrolledOnce(false);
    shouldAutoScrollRef.current = true;
    setIsScrolledToBottom(true);
    setIsScrolledToTop(false);

    // Show welcome message immediately
    const welcomeMessage: Message = {
      role: "assistant",
      content: "🔄 Starting fresh conversation! How can I assist you today?",
      createdAt: new Date().toISOString(),
    };
    setMessages([welcomeMessage]);
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
      setIsScrolledToBottom(true);
      setIsScrolledToTop(false);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setIsScrolledToTop(true);
      setIsScrolledToBottom(false);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Position classes
  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as any);
    }
  };

  // Chat toggle button
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed ${positionClasses[position]} z-50 flex items-center gap-3 w-auto h-16 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl group animate-bounce-slow pr-5`}
        style={{
          backgroundColor: themeColors.primary,
          background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
          boxShadow: `0 10px 30px -5px ${themeColors.primary}60`,
        }}
        aria-label="Open AI chat"
      >
        {/* Text on left side */}
        <div className="hidden sm:flex items-center gap-2 pl-5 pr-2 text-white">
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold whitespace-nowrap">
              Chat with AI
            </span>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs opacity-90">Click to start</span>
            </div>
          </div>
        </div>

        {/* Button icon */}
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <FiMessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
        </div>

        {/* Mobile tooltip */}
        <div className="absolute -top-12 right-0 px-3 py-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 sm:hidden">
          <div className="flex items-center gap-2">
            <span>💬 Chat with AI</span>
            <div className="w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div
      className={`fixed ${
        positionClasses[position]
      } z-50 transition-all duration-300 ${isExpanded ? "w-[30rem]" : "w-96"}`}
    >
      {/* Chat Window */}
      <div
        className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50 backdrop-blur-sm bg-white/95 flex flex-col"
        style={{
          backgroundColor: themeColors.background,
          height: isExpanded ? "650px" : "550px",
          boxShadow: `0 25px 50px -12px ${themeColors.primary}20`,
        }}
      >
        {/* Header */}
        <div
          className="relative p-4"
          style={{
            background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <FiMessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="w-1 h-1 bg-white rounded-full"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-white text-sm">AI Assistant</h3>
                <p className="text-xs text-white/90 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Secure • Private • Online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSecurityInfo(!showSecurityInfo)}
                className="p-1 rounded-xl hover:bg-white/20 transition-all duration-200 relative group"
                aria-label="Security info"
              >
                <FaShieldAlt className="w-4 h-4 text-white" />
                <div className="absolute -top-3 right-4 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Session Details
                </div>
              </button>

              <button
                onClick={handleResetSession}
                className="p-2 rounded-xl hover:bg-white/20 transition-all duration-200 relative group"
                aria-label="New conversation"
              >
                <FaSync className="w-4 h-4 text-white" />
                <div className="absolute -top-3 right-4  px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  New Chat
                </div>
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 rounded-xl hover:bg-white/20 transition-all duration-200 relative group"
                aria-label={isExpanded ? "Minimize" : "Expand"}
              >
                {isExpanded ? (
                  <FaCompress className="w-4 h-4 text-white" />
                ) : (
                  <FaExpand className="w-4 h-4 text-white" />
                )}
                <div className="absolute -top-3 right-4  px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {isExpanded ? "Minimize" : "Expand"}
                </div>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-white/20 transition-all duration-200 relative group"
                aria-label="Close chat"
              >
                <FaTimes className="w-4 h-4 text-white" />
                <div className="absolute -top-3 right-4  px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Close
                </div>
              </button>
            </div>
          </div>

          {/* Security Info Panel */}
          {showSecurityInfo && (
            <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200/50 backdrop-blur-sm p-4 z-10 animate-slide-down">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FaLock className="w-4 h-4 text-green-500" />
                  <h4 className="font-bold text-sm text-gray-900">
                    Session Security
                  </h4>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                  Secure
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 flex items-center gap-1 mb-1">
                    <FaUserSecret className="w-3 h-3" />
                    Session ID
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 truncate font-mono bg-gray-100 text-gray-800 p-2 rounded-lg text-xs border">
                      {sessionId}
                    </div>
                    <button
                      onClick={() => handleCopy(sessionId, "Session ID")}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <FaCopy className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      IP
                    </label>
                    <div className="font-mono bg-gray-100 text-gray-800 p-2 rounded-lg text-xs border truncate">
                      {clientInfo?.ip || "Loading..."}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      Visits
                    </label>
                    <div className="bg-blue-100 text-blue-700 p-2 rounded-lg text-xs font-medium text-center border border-blue-200">
                      #{clientInfo?.visitCount || 1}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <FaInfoCircle className="w-3 h-3 text-gray-400" />
                    <span>Your data is encrypted and never stored</span>
                  </div>
                </div>

                <button
                  onClick={handleResetSession}
                  className="w-full mt-2 px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <FaSync className="w-3.5 h-3.5" />
                  Start New Session
                </button>
              </div>

              {copiedText && (
                <div className="absolute bottom-4 left-4 right-4 px-3 py-2 bg-green-500 text-white text-xs rounded-lg text-center animate-fade-in-out">
                  ✓ {copiedText} copied!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Messages Container */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin"
          style={{
            height: `calc(${isExpanded ? "650px" : "550px"} - 140px)`,
          }}
          onScroll={handleScroll}
        >
          <style>{`
            .scrollbar-thin::-webkit-scrollbar { 
              width: 6px;
              height: 6px;
            }
            .scrollbar-thin::-webkit-scrollbar-track {
              background: rgba(0, 0, 0, 0.05);
              border-radius: 10px;
            }
            .scrollbar-thin::-webkit-scrollbar-thumb {
              background: rgba(0, 0, 0, 0.1);
              border-radius: 10px;
            }
            .scrollbar-thin::-webkit-scrollbar-thumb:hover {
              background: rgba(0, 0, 0, 0.2);
            }
            @keyframes slideDown {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes bounce-slow {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-5px); }
            }
            @keyframes fadeInOut {
              0% { opacity: 0; transform: translateY(5px); }
              20% { opacity: 1; transform: translateY(0); }
              80% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(-5px); }
            }
            @keyframes pulse-subtle {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
            .animate-slide-down { animation: slideDown 0.3s ease-out; }
            .animate-bounce-slow { animation: bounce-slow 3s infinite; }
            .animate-fade-in-out { animation: fadeInOut 2s ease-in-out; }
            .animate-pulse-subtle { animation: pulse-subtle 2s infinite; }
          `}</style>

          {/* Load more messages indicator */}
          {hasMoreMessages && (
            <div className="sticky top-0 z-10 mb-2">
              <div className="flex justify-center">
                <button
                  onClick={loadMoreMessages}
                  disabled={isLoadingMore}
                  className="px-4 py-2 text-xs font-medium bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoadingMore ? (
                    <>
                      <FaSpinner className="w-3 h-3 animate-spin" />
                      <span>Loading older messages...</span>
                    </>
                  ) : (
                    <>
                      <FaChevronUp className="w-3 h-3" />
                      <span>Load older messages</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {isLoadingMore && !hasMoreMessages && (
            <div className="flex justify-center py-3">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <FaSpinner className="w-3 h-3 animate-spin" />
                <span>Loading...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-200">
              <p className="text-sm text-red-600 font-medium">⚠️ {error}</p>
            </div>
          )}

          {messages.length === 0 && !isInitialLoad ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
                <FiMessageCircle className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-gray-500">
                Start a conversation to see messages here
              </p>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div
                  key={`${message.createdAt}-${index}`}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } animate-slide-down`}
                  style={{
                    animationDelay: `${Math.min(index * 50, 300)}ms`,
                    animationDuration: "0.3s",
                  }}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-4 ${
                      message.role === "user"
                        ? "rounded-tr-sm"
                        : "rounded-tl-sm"
                    } shadow-sm relative`}
                    style={{
                      background:
                        message.role === "user"
                          ? `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`
                          : "#f8fafc",
                      color:
                        message.role === "user" ? "white" : themeColors.text,
                      border:
                        message.role === "user" ? "none" : "1px solid #e2e8f0",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-2 rounded-full ${
                          message.role === "user"
                            ? "bg-white/20"
                            : "bg-gradient-to-r from-gray-100 to-gray-200"
                        }`}
                      >
                        {message.role === "user" ? (
                          <FaUser className="w-3 h-3" />
                        ) : (
                          <FaRobot className="w-3 h-3" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-medium opacity-90">
                          {message.role === "user" ? "You" : "Assistant"}
                        </span>
                      </div>
                      <span className="text-xs opacity-70">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>

                    {message.isLoading ? (
                      <div className="flex items-center gap-3">
                        <FaSpinner className="w-4 h-4 animate-spin" />
                        <span className="text-sm">
                          Processing your request...
                        </span>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Scroll to top button */}
          {/* {!isScrolledToTop && messages.length > 5 && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-32 left-1/2 transform -translate-x-1/2 p-3 rounded-full shadow-xl transition-all duration-200 hover:scale-110 hover:shadow-2xl animate-bounce-slow z-20"
              style={{
                background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
                boxShadow: `0 8px 25px ${themeColors.primary}40`,
              }}
              aria-label="Scroll to top"
            >
              <FaArrowUp className="w-4 h-4 text-white" />
            </button>
          )} */}

          {/* Scroll to bottom button */}
          {!isScrolledToBottom && messages.length > 3 && (
            <button
              onClick={scrollToBottom}
              className="fixed bottom-32 right-10 p-3 rounded-full shadow-xl transition-all duration-200 hover:scale-110 hover:shadow-2xl animate-bounce-slow z-20"
              style={{
                background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
                boxShadow: `0 8px 25px ${themeColors.primary}40`,
              }}
              aria-label="Scroll to bottom"
            >
              <FaChevronDown className="w-4 h-4 text-white" />
            </button>
          )}

          <div ref={messagesEndRef} className="h-4" />
        </div>

        {/* Input Area */}
        <div
          className="p-4 border-t border-gray-200/50"
          style={{ backgroundColor: themeColors.background }}
        >
          <form onSubmit={handleSendMessage} className="space-y-3">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message here..."
                  className="w-full px-5 py-3.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 pr-16 transition-all duration-200"
                  style={{
                    color: themeColors.text,
                    backgroundColor: "#f8fafc",
                  }}
                  disabled={isLoading}
                  autoFocus
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <kbd className="px-2 py-1 text-xs bg-white border border-gray-300 rounded-lg text-gray-600 shadow-sm">
                    ↵ Enter
                  </kbd>
                </div>
              </div>
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="px-5 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none group"
                style={{
                  background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
                  color: "white",
                  minWidth: "52px",
                }}
              >
                {isLoading ? (
                  <FaSpinner className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <FaPaperPlane className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    <span className="text-sm font-medium hidden sm:inline">
                      Send
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <FaLock className="w-3 h-3 text-green-500" />
                  <span>End-to-end encrypted</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  <span>Session: {sessionId?.substring(0, 12)}...</span>
                </div>
              </div>
              <div className="text-gray-500">
                <span className="text-xs">Powered by Spur AI</span>
              </div>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
