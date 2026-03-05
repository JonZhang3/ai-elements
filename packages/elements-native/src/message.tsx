import type { ReactNode } from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";

export type Role = "assistant" | "user" | "system";

export const MessageRoot = ({ children }: { children: ReactNode }) => (
  <View style={styles.root}>{children}</View>
);

export const Message = ({
  children,
  from,
}: {
  children: ReactNode;
  from: Role;
}) => (
  <View
    style={[
      styles.message,
      from === "user" ? styles.userMessageAlign : styles.assistantMessageAlign,
    ]}
  >
    {children}
  </View>
);

export const MessageContent = ({ children }: { children: ReactNode }) => (
  <View style={styles.content}>
    <Text style={styles.contentText}>{children}</Text>
  </View>
);

export const Suggestions = ({ children }: { children: ReactNode }) => (
  <View style={styles.suggestionsRow}>{children}</View>
);

export const Suggestion = ({
  suggestion,
  onClick,
  children,
}: {
  suggestion: string;
  onClick?: (suggestion: string) => void;
  children?: ReactNode;
}) => (
  <Pressable onPress={() => onClick?.(suggestion)} style={styles.suggestion}>
    <Text style={styles.suggestionText}>{children ?? suggestion}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  root: {
    gap: 8,
  },
  message: {
    flexDirection: "row",
  },
  assistantMessageAlign: {
    justifyContent: "flex-start",
  },
  userMessageAlign: {
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    maxWidth: "90%",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  contentText: {
    color: "#f8fafc",
    fontSize: 14,
    lineHeight: 20,
  },
  suggestionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  suggestion: {
    backgroundColor: "#111827",
    borderColor: "#334155",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  suggestionText: {
    color: "#cbd5e1",
    fontSize: 14,
  },
});
