export interface AIExecutionContext {
  userId: string;
}

export interface ToolResult {
  type: string;
  name: string;
  callId: string;
  status: string;
  output: { type: string; text: string };
}
