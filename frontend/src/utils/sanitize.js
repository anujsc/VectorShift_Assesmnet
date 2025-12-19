// Security utility for XSS prevention
import DOMPurify from "dompurify";

/**
 * Sanitize user input to prevent XSS attacks
 * Use this for any user-generated content or LLM responses
 */
export const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;

  // Configure DOMPurify to be strict
  const config = {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [], // No attributes allowed
    KEEP_CONTENT: true, // Keep text content
  };

  return DOMPurify.sanitize(input, config);
};

/**
 * Sanitize HTML content (for cases where HTML is needed)
 * More permissive but still safe
 */
export const sanitizeHTML = (html) => {
  if (typeof html !== "string") return html;

  const config = {
    ALLOWED_TAGS: [
      "b",
      "i",
      "em",
      "strong",
      "a",
      "p",
      "br",
      "ul",
      "ol",
      "li",
      "code",
      "pre",
    ],
    ALLOWED_ATTR: ["href", "target"],
    ALLOW_DATA_ATTR: false,
  };

  return DOMPurify.sanitize(html, config);
};

/**
 * Validate and sanitize node name
 */
export const sanitizeNodeName = (name) => {
  if (!name || typeof name !== "string") return "";

  // Remove any HTML/script tags
  const cleaned = sanitizeInput(name);

  // Trim and limit length
  return cleaned.trim().slice(0, 100);
};

/**
 * Validate variable name (for Text node)
 */
export const isValidVariableName = (name) => {
  // Must start with letter, underscore, or $
  // Can contain letters, numbers, underscores, $
  const regex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
  return regex.test(name);
};
