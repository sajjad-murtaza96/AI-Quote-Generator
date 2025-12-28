export interface QuoteResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;
  service_tier: string;
}

export interface Choice {
  index: number;
  message: Message;
  finish_reason: string;
}

export interface Message {
  role: string;
  content: string;
}

export interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  prompt_tokens_details: PromptTokensDetails;
  completion_tokens_details: CompletionTokensDetails;
}

export interface PromptTokensDetails {
  cached_tokens: number;
  audio_tokens: number;
}

export interface CompletionTokensDetails {
  reasoning_tokens: number;
  audio_tokens: number;
  accepted_prediction_tokens: number;
  rejected_prediction_tokens: number;
}
