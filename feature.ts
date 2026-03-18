import {
    OpenFeature,
    Provider,
    ResolutionDetails,
    EvaluationContext,
    JsonValue,
    Logger
  } from "@openfeature/server-sdk";
  
  class SimpleProvider implements Provider {
    metadata = { name: "simple-provider" };
  
    async resolveBooleanEvaluation(
      flagKey: string,
      defaultValue: boolean,
      context: EvaluationContext,
      logger: Logger
    ): Promise<ResolutionDetails<boolean>> {
  
      if (flagKey === "doctor_available") {
        return { value: true, reason: "STATIC" };
      }
  
      if (flagKey === "use_ai_fallback") {
        return { value: true, reason: "STATIC" };
      }
  
      return { value: defaultValue, reason: "DEFAULT" };
    }
  
    async resolveStringEvaluation(
      flagKey: string,
      defaultValue: string,
      context: EvaluationContext,
      logger: Logger
    ): Promise<ResolutionDetails<string>> {
      return { value: defaultValue, reason: "DEFAULT" };
    }
  
    async resolveNumberEvaluation(
      flagKey: string,
      defaultValue: number,
      context: EvaluationContext,
      logger: Logger
    ): Promise<ResolutionDetails<number>> {
      return { value: defaultValue, reason: "DEFAULT" };
    }
  
    async resolveObjectEvaluation<T extends JsonValue>(
      flagKey: string,
      defaultValue: T,
      context: EvaluationContext,
      logger: Logger
    ): Promise<ResolutionDetails<T>> {
      return { value: defaultValue, reason: "DEFAULT" };
    }
  }
  
  OpenFeature.setProvider(new SimpleProvider());
  
  export const client = OpenFeature.getClient();