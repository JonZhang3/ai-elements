import type { ReactNode } from "react";

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ScrollViewProps,
} from "react-native";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

interface ConversationContextValue {
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

const ConversationContext = createContext<ConversationContextValue | null>(null);

const useConversationContext = () => {
  const ctx = useContext(ConversationContext);
  if (!ctx) {
    throw new Error("Conversation components must be used inside <Conversation>.");
  }
  return ctx;
};

export type ConversationProps = ScrollViewProps & {
  children: ReactNode;
  bottomOffset?: number;
};

export const Conversation = ({
  children,
  bottomOffset = 32,
  onScroll,
  ...props
}: ConversationProps) => {
  const ref = useRef<ScrollView>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
      const remaining = contentSize.height - (contentOffset.y + layoutMeasurement.height);
      setIsAtBottom(remaining <= bottomOffset);
      onScroll?.(event);
    },
    [bottomOffset, onScroll]
  );

  const scrollToBottom = useCallback(() => {
    ref.current?.scrollToEnd({ animated: true });
  }, []);

  const value = useMemo(
    () => ({
      isAtBottom,
      scrollToBottom,
    }),
    [isAtBottom, scrollToBottom]
  );

  return (
    <ConversationContext.Provider value={value}>
      <ScrollView
        ref={ref}
        contentContainerStyle={styles.contentContainer}
        onContentSizeChange={scrollToBottom}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        {...props}
      >
        {children}
      </ScrollView>
    </ConversationContext.Provider>
  );
};

export const ConversationContent = ({ children }: { children: ReactNode }) => (
  <View style={styles.stack}>{children}</View>
);

export const ConversationEmptyState = ({
  title = "No messages yet",
  description = "Start a conversation to see messages here",
}: {
  title?: string;
  description?: string;
}) => (
  <View style={styles.emptyState}>
    <Text style={styles.emptyTitle}>{title}</Text>
    <Text style={styles.emptyDescription}>{description}</Text>
  </View>
);

export const ConversationScrollButton = ({
  label = "Scroll to bottom",
}: {
  label?: string;
}) => {
  const { isAtBottom, scrollToBottom } = useConversationContext();
  if (isAtBottom) {
    return null;
  }

  return (
    <View style={styles.scrollButtonWrap}>
      <Pressable onPress={scrollToBottom} style={styles.scrollButton}>
        <Text style={styles.scrollButtonText}>{label}</Text>
      </Pressable>
    </View>
  );
};

export interface ConversationMessage {
  role: "user" | "assistant" | "system" | "data" | "tool";
  content: string;
}

const defaultFormatMessage = (message: ConversationMessage): string => {
  const roleLabel = message.role.charAt(0).toUpperCase() + message.role.slice(1);
  return `**${roleLabel}:** ${message.content}`;
};

export const messagesToMarkdown = (
  messages: ConversationMessage[],
  formatMessage: (message: ConversationMessage, index: number) => string = defaultFormatMessage
) => messages.map((msg, i) => formatMessage(msg, i)).join("\n\n");

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    padding: 16,
  },
  stack: {
    gap: 12,
  },
  emptyState: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    minHeight: 240,
    padding: 24,
  },
  emptyTitle: {
    color: "#e2e8f0",
    fontSize: 16,
    fontWeight: "600",
  },
  emptyDescription: {
    color: "#94a3b8",
    marginTop: 4,
    textAlign: "center",
  },
  scrollButtonWrap: {
    alignItems: "center",
    marginTop: 8,
  },
  scrollButton: {
    backgroundColor: "#1e293b",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  scrollButtonText: {
    color: "#f8fafc",
    fontSize: 12,
    fontWeight: "500",
  },
});
