export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  } else {
    // Redirect to homepage with hash
    window.location.href = `/#${sectionId}`;
  }
};
