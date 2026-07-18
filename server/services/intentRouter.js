export function handleIntent(message) {
  const text = message.toLowerCase().trim();

  // Navigation
  if (
    text.includes("gate") ||
    text.includes("navigation") ||
    text.includes("find my gate")
  ) {
    return {
      handled: true,
      reply:
        "I can help you navigate inside the stadium. Please share your gate number or ticket section to get the best route.",
    };
  }

  // Food
  if (
    text.includes("food") ||
    text.includes("drink") ||
    text.includes("restaurant")
  ) {
    return {
      handled: true,
      reply:
        "Food courts are available throughout the stadium. Tell me your seating section and I'll recommend the nearest options.",
    };
  }

  // Parking
  if (text.includes("parking")) {
    return {
      handled: true,
      reply:
        "I can help you find the nearest parking area. Which stadium are you visiting today?",
    };
  }

  // Emergency
  if (
    text.includes("emergency") ||
    text.includes("medical") ||
    text.includes("security")
  ) {
    return {
      handled: true,
      reply:
        "If this is an emergency, please contact the nearest stadium staff immediately. I can also help locate first-aid stations and emergency exits.",
    };
  }

  // Match Schedule
  if (
    text.includes("today's match") ||
    text.includes("todays match") ||
    text.includes("match schedule")
  ) {
    return {
      handled: true,
      reply:
        "Please tell me the competition (for example, FIFA Club World Cup), the stadium, or the teams you're interested in. I'll then help with the relevant match information.",
    };
  }

  return {
    handled: false,
  };
}