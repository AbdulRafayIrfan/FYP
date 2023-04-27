export async function moderateContent(titleText, contentText) {
  function checkForShouting(text) {
    const shoutRegex = /[A-Z]{5,}/g;
    const hasExcessiveShouting = shoutRegex.test(text);

    if (hasExcessiveShouting) {
      const lowerCaseText = text.toLowerCase();
      return lowerCaseText;
    }

    // Else return text itself
    return text;
  }

  // Check title and content text for shouting and clean (for shouting only)
  const cleanedTitle = checkForShouting(titleText);
  const cleanedContent = checkForShouting(contentText);

  // Rapid API (PurgoMalum) to detect profanity
  const url = `https://community-purgomalum.p.rapidapi.com/containsprofanity?text=${
    cleanedTitle + " " + cleanedContent
  }`;
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": "community-purgomalum.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const containsProfanity = await response.text();
    console.log(containsProfanity, "Profanity Checked!");
    // If doesn't contains profanity
    // Return the original text (without shouting if applied)
    if (containsProfanity === "true") {
      return null;
    } else if (containsProfanity === "false") {
      // Return object of post content (title with its content)
      return { cleanTitle: cleanedTitle, cleanContent: cleanedContent };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
