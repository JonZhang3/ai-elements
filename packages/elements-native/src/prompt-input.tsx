import type { ReactNode } from "react";

import { Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from "react-native";
import { createContext, useContext, useMemo, useState } from "react";

interface PromptInputContextValue {
  value: string;
  setValue: (next: string) => void;
  submit: () => void;
}

const PromptInputContext = createContext<PromptInputContextValue | null>(null);

const usePromptInputContext = () => {
  const ctx = useContext(PromptInputContext);
  if (!ctx) {
    throw new Error("PromptInput components must be used inside <PromptInput>.");
  }
  return ctx;
};

export const PromptInput = ({
  children,
  defaultValue = "",
  onSubmit,
}: {
  children: ReactNode;
  defaultValue?: string;
  onSubmit?: (value: string) => void;
}) => {
  const [value, setValue] = useState(defaultValue);

  const contextValue = useMemo(
    () => ({
      value,
      setValue,
      submit: () => {
        const trimmed = value.trim();
        if (!trimmed) {
          return;
        }
        onSubmit?.(trimmed);
        setValue("");
      },
    }),
    [value, onSubmit]
  );

  return <PromptInputContext.Provider value={contextValue}>{children}</PromptInputContext.Provider>;
};

export const PromptInputBody = ({ children }: { children: ReactNode }) => (
  <View style={styles.body}>{children}</View>
);

export const PromptInputTextarea = ({
  placeholder = "Type a message...",
  ...props
}: Omit<TextInputProps, "onChangeText" | "value">) => {
  const { value, setValue, submit } = usePromptInputContext();
  return (
    <TextInput
      multiline
      onChangeText={setValue}
      onSubmitEditing={submit}
      placeholder={placeholder}
      placeholderTextColor="#64748b"
      style={styles.textarea}
      value={value}
      {...props}
    />
  );
};

export const PromptInputToolbar = ({ children }: { children: ReactNode }) => (
  <View style={styles.toolbar}>{children}</View>
);

export const PromptInputSubmit = ({
  label = "Send",
}: {
  label?: string;
}) => {
  const { submit } = usePromptInputContext();
  return (
    <Pressable onPress={submit} style={styles.submitButton}>
      <Text style={styles.submitText}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#0f172a",
    borderColor: "#334155",
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
  },
  textarea: {
    color: "#f8fafc",
    fontSize: 14,
    maxHeight: 144,
    minHeight: 64,
    textAlignVertical: "top",
  },
  toolbar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  submitText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },
});
