// Blogs Carousel Functionality
class BlogsCarousel {
  constructor() {
    this.track = document.getElementById("carouselTrack");
    this.progressBars = document.querySelectorAll(".progress_bar");
    this.cards = document.querySelectorAll(".blog_card");
    this.currentSlide = 0;
    this.totalSlides = this.cards.length;

    // Initialize responsive settings
    this.updateResponsiveSettings();

    this.init();
  }

  updateResponsiveSettings() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 480) {
      // Mobile: Show 1 card at a time
      this.slidesToShow = 1;
      this.slideWidth = screenWidth - 40; // Full width minus padding
    } else if (screenWidth <= 768) {
      // Tablet: Show 2 cards at a time
      this.slidesToShow = 2;
      this.slideWidth = (screenWidth - 60) / 2; // Half width minus padding
    } else {
      // Desktop: Show 3 cards at a time
      this.slidesToShow = 3;
      this.slideWidth = 432; // 400px card width + 32px margin
    }

    this.maxSlide = Math.max(0, this.totalSlides - this.slidesToShow);

    // Ensure current slide is within bounds
    if (this.currentSlide > this.maxSlide) {
      this.currentSlide = this.maxSlide;
    }
  }

  init() {
    this.setupEventListeners();
    this.updateCarousel();
    this.updateProgressBars();
    this.startAutoPlay();

    // Add resize listener for responsive behavior
    window.addEventListener("resize", () => {
      this.updateResponsiveSettings();
      this.updateCarousel();
      this.updateProgressBars();
    });
  }

  setupEventListeners() {
    // Progress bar navigation
    this.progressBars.forEach((bar, index) => {
      bar.addEventListener("click", () => {
        console.log(`Progress bar ${index} clicked`);
        this.goToSlide(index);
      });
    });

    // Touch/swipe support
    this.track.addEventListener("touchstart", (e) => {
      this.touchStartX = e.touches[0].clientX;
    });

    this.track.addEventListener("touchend", (e) => {
      this.touchEndX = e.changedTouches[0].clientX;
      this.handleSwipe();
    });

    // Mouse drag support
    this.track.addEventListener("mousedown", (e) => {
      this.mouseStartX = e.clientX;
      this.isDragging = true;
      this.track.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
      if (this.isDragging) {
        e.preventDefault();
      }
    });

    document.addEventListener("mouseup", (e) => {
      if (this.isDragging) {
        this.mouseEndX = e.clientX;
        this.handleSwipe();
        this.isDragging = false;
        this.track.style.cursor = "grab";
      }
    });

    // Pause auto-play on hover
    this.track.addEventListener("mouseenter", () => {
      this.pauseAutoPlay();
    });

    this.track.addEventListener("mouseleave", () => {
      this.startAutoPlay();
    });
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = this.touchEndX
      ? this.touchEndX - this.touchStartX
      : this.mouseEndX - this.mouseStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        this.prevSlide();
      } else {
        this.nextSlide();
      }
    }
  }

  goToSlide(slideIndex) {
    this.currentSlide = Math.min(slideIndex, this.maxSlide);
    this.updateCarousel();
    this.updateProgressBars();
  }

  nextSlide() {
    if (this.currentSlide < this.maxSlide) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0; // Loop back to start
    }
    this.updateCarousel();
    this.updateProgressBars();
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.maxSlide; // Loop to end
    }
    this.updateCarousel();
    this.updateProgressBars();
  }

  updateCarousel() {
    const translateX = -this.currentSlide * this.slideWidth;
    this.track.style.transform = `translateX(${translateX}px)`;
  }

  updateProgressBars() {
    console.log("Updating progress bars, current slide:", this.currentSlide);
    console.log(
      "Total slides:",
      this.totalSlides,
      "Slides to show:",
      this.slidesToShow
    );

    // Calculate how many progress bars we need based on total slides
    const totalProgressBars = Math.ceil(this.totalSlides / this.slidesToShow);

    this.progressBars.forEach((bar, index) => {
      // Only show progress bars that are needed
      if (index < totalProgressBars) {
        bar.style.display = "block";
        const isActive = index === this.currentSlide;
        bar.classList.toggle("active", isActive);
        console.log(
          `Progress bar ${index}: ${isActive ? "active" : "inactive"}`
        );
      } else {
        bar.style.display = "none";
      }
    });
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Auto-advance every 5 seconds
  }

  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  // Public method to manually control carousel
  setSlide(slideIndex) {
    this.goToSlide(slideIndex);
  }

  // Public method to get current slide
  getCurrentSlide() {
    return this.currentSlide;
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const blogsCarousel = new BlogsCarousel();

  // Expose carousel instance globally for external control if needed
  window.blogsCarousel = blogsCarousel;

  // Debug: Log progress bars to console
  console.log("Progress bars found:", blogsCarousel.progressBars.length);
  console.log("Cards found:", blogsCarousel.cards.length);
});

// Additional utility functions for carousel
const CarouselUtils = {
  // Function to add new blog cards dynamically
  addBlogCard: (cardData) => {
    const carouselTrack = document.getElementById("carouselTrack");
    const newCard = document.createElement("div");
    newCard.className = "blog_card";
    newCard.innerHTML = `
      <div class="blog_image">
        <img src="${cardData.image}" alt="${cardData.title}" />
      </div>
      <div class="blog_content">
        <h3 class="blog_title">${cardData.title}</h3>
        <p class="blog_description">${cardData.description}</p>
        <button class="read_blog_button">READ BLOG →</button>
      </div>
    `;
    carouselTrack.appendChild(newCard);

    // Update progress bars if needed
    const progressContainer = document.querySelector(".progress_indicator");
    const newProgressBar = document.createElement("div");
    newProgressBar.className = "progress_bar";
    progressContainer.appendChild(newProgressBar);

    // Reinitialize carousel with new data
    if (window.blogsCarousel) {
      window.blogsCarousel.totalSlides = carouselTrack.children.length;
      window.blogsCarousel.maxSlide =
        window.blogsCarousel.totalSlides - window.blogsCarousel.slidesToShow;
    }
  },

  // Function to remove blog card
  removeBlogCard: (index) => {
    const carouselTrack = document.getElementById("carouselTrack");
    const progressBars = document.querySelectorAll(".progress_bar");

    if (carouselTrack.children[index]) {
      carouselTrack.children[index].remove();
      progressBars[index].remove();

      // Reinitialize carousel
      if (window.blogsCarousel) {
        window.blogsCarousel.totalSlides = carouselTrack.children.length;
        window.blogsCarousel.maxSlide =
          window.blogsCarousel.totalSlides - window.blogsCarousel.slidesToShow;

        // Adjust current slide if necessary
        if (
          window.blogsCarousel.currentSlide >= window.blogsCarousel.totalSlides
        ) {
          window.blogsCarousel.currentSlide = Math.max(
            0,
            window.blogsCarousel.totalSlides - window.blogsCarousel.slidesToShow
          );
        }

        window.blogsCarousel.updateCarousel();
        window.blogsCarousel.updateProgressBars();
      }
    }
  },
};

// Expose utility functions globally
window.CarouselUtils = CarouselUtils;
