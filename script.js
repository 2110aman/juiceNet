document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".container_item");
  const footerLinks = document.querySelectorAll(".footer_link");

  // Section mapping for navigation
  const sectionMap = {
    home_button: "hero_section",
    features: "features_section",
    about_us: "about_section",
    partnership: "services_section",
    blog: "blogs_section",
    faq: "pricing_section",
    contact_us: "footer_section",
  };

  // Footer link mapping (text-based)
  const footerLinkMap = {
    Home: "hero_section",
    Features: "features_section",
    "About Us": "about_section",
    Partnerships: "services_section",
    Blog: "blogs_section",
    FAQ: "pricing_section",
    Shop: "ev_products_section",
    "Contact Us": "footer_section",
  };

  // Function to handle smooth scrolling
  function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  // Function to update active states
  function updateActiveStates(activeSectionId) {
    // Update main navigation
    items.forEach((item) => {
      const itemId = item.id;
      const mappedSection = sectionMap[itemId];

      if (mappedSection === activeSectionId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Update footer navigation
    footerLinks.forEach((link) => {
      const linkText = link.textContent.trim();
      const mappedSection = footerLinkMap[linkText];

      if (mappedSection === activeSectionId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // Main navigation click handlers
  items.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      // Get the section ID to scroll to
      const itemId = this.id;
      const sectionId = sectionMap[itemId];

      if (sectionId) {
        scrollToSection(sectionId);
        updateActiveStates(sectionId);
      }
    });
  });

  // Footer navigation click handlers
  footerLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const linkText = this.textContent.trim();
      const sectionId = footerLinkMap[linkText];

      if (sectionId) {
        scrollToSection(sectionId);
        updateActiveStates(sectionId);
      }
    });
  });

  // Update active navigation item based on scroll position
  function updateActiveNavItem() {
    const sections = Object.values(sectionMap);
    const scrollPosition = window.scrollY + 100; // Offset for better UX

    let currentSection = "";

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          currentSection = sectionId;
        }
      }
    });

    // Update active states for both navigation systems
    if (currentSection) {
      updateActiveStates(currentSection);
    }
  }

  // Listen for scroll events to update active navigation
  window.addEventListener("scroll", updateActiveNavItem);

  // Initial call to set active item
  updateActiveNavItem();

  // Mobile Navigation Functionality
  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const mobileNavOverlay = document.getElementById("mobileNavOverlay");
  const mobileNavSidebar = document.getElementById("mobileNavSidebar");
  const mobileNavClose = document.getElementById("mobileNavClose");
  const mobileNavItems = document.querySelectorAll(".mobile_nav_item");

  // Debug: Check if elements exist
  console.log("Mobile Menu Button:", mobileMenuButton);
  console.log("Mobile Nav Overlay:", mobileNavOverlay);
  console.log("Mobile Nav Sidebar:", mobileNavSidebar);
  console.log("Mobile Nav Items:", mobileNavItems.length);

  // Function to open mobile navigation
  function openMobileNav() {
    console.log("Opening mobile nav");
    if (mobileMenuButton) mobileMenuButton.classList.add("active");
    if (mobileNavOverlay) mobileNavOverlay.classList.add("active");
    if (mobileNavSidebar) mobileNavSidebar.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Function to close mobile navigation
  function closeMobileNav() {
    console.log("Closing mobile nav");
    if (mobileMenuButton) mobileMenuButton.classList.remove("active");
    if (mobileNavOverlay) mobileNavOverlay.classList.remove("active");
    if (mobileNavSidebar) mobileNavSidebar.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Event listeners for mobile navigation
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      openMobileNav();
    });
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeMobileNav();
    });
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeMobileNav();
    });
  }

  // Mobile navigation item clicks
  mobileNavItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      const sectionId = this.getAttribute("data-section");

      if (sectionId) {
        scrollToSection(sectionId);
        updateActiveStates(sectionId);

        // Update mobile nav active states
        mobileNavItems.forEach((navItem) => navItem.classList.remove("active"));
        this.classList.add("active");

        // Close mobile nav after selection
        closeMobileNav();
      }
    });
  });

  // Update mobile navigation active states based on scroll
  function updateMobileNavActiveStates(activeSectionId) {
    mobileNavItems.forEach((item) => {
      const itemSection = item.getAttribute("data-section");
      if (itemSection === activeSectionId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // Enhanced scroll detection for mobile nav
  function updateActiveNavItemWithMobile() {
    const sections = Object.values(sectionMap);
    const scrollPosition = window.scrollY + 100;

    let currentSection = "";

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          currentSection = sectionId;
        }
      }
    });

    // Update active states for both navigation systems
    if (currentSection) {
      updateActiveStates(currentSection);
      updateMobileNavActiveStates(currentSection);
    }
  }

  // Replace the original scroll listener
  window.removeEventListener("scroll", updateActiveNavItem);
  window.addEventListener("scroll", updateActiveNavItemWithMobile);

  // Scroll Icon Functionality
  const scrollIcon = document.querySelector(".scroll_icon");
  if (scrollIcon) {
    scrollIcon.addEventListener("click", function (e) {
      e.preventDefault();

      // Find the next section after hero_section
      const heroSection = document.getElementById("hero_section");
      if (heroSection) {
        const nextSection = heroSection.nextElementSibling;
        if (nextSection) {
          nextSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  }
});

function toggleMobileNav() {
  console.log("Mobile nav button clicked!");
  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const mobileNavOverlay = document.getElementById("mobileNavOverlay");
  const mobileNavSidebar = document.getElementById("mobileNavSidebar");

  if (mobileMenuButton && mobileNavOverlay && mobileNavSidebar) {
    mobileMenuButton.classList.toggle("active");
    mobileNavOverlay.classList.toggle("active");
    mobileNavSidebar.classList.toggle("active");

    if (mobileNavSidebar.classList.contains("active")) {
      document.body.style.overflow = "hidden";
      console.log("Mobile nav opened");
    } else {
      document.body.style.overflow = "";
      console.log("Mobile nav closed");
    }
  } else {
    console.log("Mobile nav elements not found!");
  }
}

// Close mobile nav when clicking overlay
document
  .getElementById("mobileNavOverlay")
  .addEventListener("click", function () {
    toggleMobileNav();
  });

// Close mobile nav when clicking close button
document
  .getElementById("mobileNavClose")
  .addEventListener("click", function () {
    toggleMobileNav();
  });
