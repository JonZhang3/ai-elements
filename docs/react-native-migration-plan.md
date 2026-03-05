# React Native Migration Plan

## Goals
- Create a runnable React Native app in this monorepo.
- Start migration with low-risk components first.
- Keep API semantics close to existing web components.

## Completed
- ✅ Created Expo app at `apps/native`.
- ✅ Added native component package at `packages/elements-native`.
- ✅ Migrated base messaging components: `Message`, `MessageContent`, `Suggestion`, `Suggestions`.
- ✅ Migrated first interactive set: `Conversation`, `ConversationContent`, `ConversationEmptyState`, `ConversationScrollButton`.
- ✅ Migrated base input set: `PromptInput`, `PromptInputBody`, `PromptInputTextarea`, `PromptInputToolbar`, `PromptInputSubmit`.
- ✅ Updated demo app to run a small local chat loop with suggestion click + prompt submission.

## In Progress
1. Align native prop surfaces 1:1 with web where possible.
2. Add native equivalents for attachments and source references in prompt input.

## Next Steps
1. Add `PromptInput` attachment support using native file/document/image picker APIs.
2. Add markdown rendering strategy for message content parity.
3. Introduce shared token/theme layer for web/native parity.
4. Build component compatibility matrix for web-only features to native alternatives.
