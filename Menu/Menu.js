document.addEventListener("DOMContentLoaded", function () {
  const responseModal = new bootstrap.Modal("#responseModal");

  // Toggle rating section visibility
  document.querySelectorAll(".rate-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const card = this.closest(".card");
      const ratingSection = card.querySelector(".rating-section");

      // Toggle visibility
      if (ratingSection.style.display === "block") {
        ratingSection.style.display = "none";
        card.style.height = "auto";
      } else {
        ratingSection.style.display = "block";
        card.style.height = card.offsetHeight; // Expand card
      }
    });
  });

  // Star rating interaction
  document.querySelectorAll(".star").forEach((star) => {
    star.addEventListener("click", function () {
      const value = parseInt(this.getAttribute("data-value"));
      const starsContainer = this.closest(".d-flex");

      // Update stars in current card only
      starsContainer.querySelectorAll(".star").forEach((s, index) => {
        s.textContent = index < value ? "★" : "☆";
        s.classList.toggle("active", index < value);
      });

      // Set hidden input value
      starsContainer.nextElementSibling.value = value;
    });
  });

  // Rating submission
  document.querySelectorAll(".submit-rating").forEach((btn) => {
    btn.addEventListener("click", function () {
      const card = this.closest(".card");
      const nameInput = card.querySelector(".rater-name");
      const ratingValue = parseInt(
        card.querySelector(".selected-rating").value
      );
      const itemName = card.querySelector(".card-title").textContent;

      // Validate
      if (!nameInput.value.trim()) {
        showResponse("Error", "Please enter your name");
        return;
      }

      if (ratingValue <= 0) {
        showResponse("Error", "Please select a rating");
        return;
      }

      // Check if user has ordered
      const hasOrdered = localStorage.getItem("User_Name");
      const userName = nameInput.value.trim();

      if (hasOrdered == userName) {
        // Save rating
        const ratings = JSON.parse(localStorage.getItem("itemRatings") || "{}");
        ratings[itemName] = ratings[itemName] || [];
        ratings[itemName].push({
          user: userName,
          rating: ratingValue,
          date: new Date().toISOString(),
        });
        localStorage.setItem("itemRatings", JSON.stringify(ratings));

        showResponse("Thank You!", "Your rating has been saved");
      } else {
        showResponse(
          "Cannot Rate",
          "You must place at least one order before rating"
        );
      }

      // Reset form
      card.querySelector(".rating-section").style.display = "none";
      card.style.height = "auto";
      nameInput.value = "";
      card.querySelectorAll(".star").forEach((s) => {
        s.textContent = "☆";
        s.classList.remove("active");
      });
      card.querySelector(".selected-rating").value = "0";
    });
  });

  function showResponse(title, message) {
    document.getElementById("responseTitle").textContent = title;
    document.getElementById("responseMessage").textContent = message;
    responseModal.show();
  }
});
