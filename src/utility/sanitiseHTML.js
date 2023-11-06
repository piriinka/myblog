export const sanitiseHTML = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};
export const truncatedStory = (description, maxLength) => {
  //html elemek eltavolitasa a previewbol
  const sanitisedDescription = sanitiseHTML(description);
  let truncatedStoryDesc = sanitisedDescription;
  //console.log(truncatedStory);
  if (sanitisedDescription.length > maxLength) {
    const lastIndexSpace = sanitisedDescription.lastIndexOf(" ", maxLength);
    if (lastIndexSpace !== -1) {
      truncatedStoryDesc =
        sanitisedDescription.substring(0, lastIndexSpace);
    } else {
      truncatedStoryDesc = sanitisedDescription.substring(0, maxLength);
    }
  }
  return truncatedStoryDesc;
};
