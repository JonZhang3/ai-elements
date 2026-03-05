import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import {
  Conversation,
  ConversationContent,
  Message,
  MessageContent,
  PromptInput,
  PromptInputBody,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  Suggestion,
  Suggestions,
} from "@repo/elements-native";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const initialMessages: ChatMessage[] = [
  {
    content: "我是 React Native 版本的 Conversation + PromptInput，已进入迁移第 2 阶段。",
    id: "m1",
    role: "assistant",
  },
];

const defaultSuggestions = [
  "总结上周项目进展",
  "给我一份发布前检查清单",
  "将需求拆成可执行任务",
];

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const sendMessage = (content: string) => {
    setMessages((prev) => {
      const next = [
        ...prev,
        { content, id: `u-${Date.now()}`, role: "user" as const },
        {
          content: `已收到：${content}`,
          id: `a-${Date.now()}`,
          role: "assistant" as const,
        },
      ];
      return next;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Text style={styles.title}>AI Elements Native Migration</Text>
        <Text style={styles.subtitle}>阶段 2：Conversation / PromptInput 初版已落地</Text>

        <View style={styles.chatCard}>
          <Conversation>
            <ConversationContent>
              {messages.map((message) => (
                <Message from={message.role} key={message.id}>
                  <MessageContent>{message.content}</MessageContent>
                </Message>
              ))}
            </ConversationContent>
          </Conversation>

          <Suggestions>
            {defaultSuggestions.map((suggestion) => (
              <Suggestion
                key={suggestion}
                onClick={(value) => sendMessage(value)}
                suggestion={suggestion}
              />
            ))}
          </Suggestions>

          <PromptInput onSubmit={sendMessage}>
            <PromptInputBody>
              <PromptInputTextarea />
              <PromptInputToolbar>
                <PromptInputSubmit label="发送" />
              </PromptInputToolbar>
            </PromptInputBody>
          </PromptInput>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#0b1020",
    flex: 1,
  },
  container: {
    flex: 1,
    gap: 12,
    padding: 16,
  },
  title: {
    color: "#f8fafc",
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 14,
    marginBottom: 4,
  },
  chatCard: {
    backgroundColor: "#020617",
    borderColor: "#1e293b",
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    gap: 12,
    padding: 10,
  },
});
