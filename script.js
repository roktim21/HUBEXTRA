// Typing animation
document.addEventListener("DOMContentLoaded", function () {
  const text = "Your digital portal for university life.";
  const typingTextElement = document.getElementById("typing-text");
  let i = 0;
  const typingSpeed = 100; // milliseconds per character
  const deleteSpeed = 50; // milliseconds per character when deleting
  const pauseBeforeDelete = 2000; // pause before starting to delete
  const pauseBeforeRestart = 1000; // pause before restarting typing
  let isDeleting = false;

  function animateText() {
    // Typing forward
    if (!isDeleting && i < text.length) {
      typingTextElement.textContent += text.charAt(i);
      i++;
      setTimeout(animateText, typingSpeed);
      return;
    }

    // Pause before deleting
    if (!isDeleting && i >= text.length) {
      isDeleting = true;
      setTimeout(animateText, pauseBeforeDelete);
      return;
    }

    // Deleting
    if (isDeleting && i > 0) {
      i--;
      typingTextElement.textContent = text.substring(0, i);
      setTimeout(animateText, deleteSpeed);
      return;
    }

    // Pause before restarting
    if (isDeleting && i <= 0) {
      isDeleting = false;
      setTimeout(animateText, pauseBeforeRestart);
      return;
    }
  }

  // Start the animation
  setTimeout(animateText, 500);
});
function searchFaculty() {
  const input = document.getElementById("facultySearch").value.toLowerCase();
  const cards = document.querySelectorAll(".faculty-card");

  cards.forEach((card) => {
    const name = card.querySelector("h3, h5")?.textContent.toLowerCase() || "";
    const emailSpan = card.querySelector("span");
    const email = emailSpan ? emailSpan.textContent.toLowerCase() : "";

    if (name.includes(input) || email.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
// Modal
function openFacultyModal(department) {
  // Hide all faculty lists
  const facultyLists = document.querySelectorAll(".faculty-list");
  facultyLists.forEach((list) => {
    list.classList.add("hidden");
  });

  // Show the selected department's faculty list
  document.getElementById(department + "-faculty").classList.remove("hidden");

  // Update the modal title
  document.getElementById("facultyDeptTitle").textContent =
    department + " Department Faculty";

  // Show the modal
  document.getElementById("facultyModal").style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}
function closeFacultyModal() {
  document.getElementById("facultyModal").style.display = "none";
  document.body.style.overflow = "auto"; // Re-enable scrolling
}
function openAllFacultyModal() {
  // Hide all faculty lists
  const facultyLists = document.querySelectorAll(".faculty-list");
  facultyLists.forEach((list) => {
    list.classList.add("hidden");
  });

  // Show the All Faculty list
  document.getElementById("ALL-faculty").classList.remove("hidden");

  // Update the modal title
  document.getElementById("facultyDeptTitle").textContent =
    "All Faculty Members";

  // Show the modal
  document.getElementById("facultyModal").style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

window.onclick = function (event) {
  const teamModal = document.getElementById("teamModal");
  const bloodModal = document.getElementById("bloodDonorModal");
  const canteenModal = document.getElementById("canteenModal");
  const facultyModal = document.getElementById("facultyModal");
  const cgpaModal = document.getElementById("cgpaCalculatorModal");

  if (event.target === cgpaModal) {
    closeCgpaModal();
  }
  if (event.target === teamModal) {
    closeTeamModal();
  }
  if (event.target === bloodModal) {
    closeBloodModal();
  }
  if (event.target === canteenModal) {
    closeCanteenModal();
  }
  if (event.target === facultyModal) {
    facultyModal.style.display = "none";
    document.body.style.overflow = "auto";

    // Clear the search input
    document.getElementById("facultySearch").value = "";

    // Show all faculty cards again
    document.querySelectorAll(".faculty-card").forEach((card) => {
      card.style.display = "block";
    });
  }
};

function toggleDept(id) {
  const element = document.getElementById(id);
  if (element.classList.contains("hidden")) {
    element.classList.remove("hidden");
    element.previousElementSibling.querySelector(
      "span:last-child"
    ).textContent = "-";
  } else {
    element.classList.add("hidden");
    element.previousElementSibling.querySelector(
      "span:last-child"
    ).textContent = "+";
  }
}

function showDonors(bloodType) {
  const donorInfo = document.getElementById("donor-info");
  const bloodTypeSpan = document.getElementById("blood-type");
  const donorList = document.getElementById("donor-list");

  // Sample donor data - in a real app, this would come from a database
  const donors = {
    "A+": [
      {
        name: "John Smith",
        phone: "555-123-4567",
        lastDonation: "2023-03-15",
      },
      {
        name: "Emily Johnson",
        phone: "555-234-5678",
        lastDonation: "2023-05-22",
      },
    ],
    "B+": [
      {
        name: "Michael Brown",
        phone: "555-345-6789",
        lastDonation: "2023-04-10",
      },
    ],
    "O+": [
      {
        name: "Sarah Davis",
        phone: "555-456-7890",
        lastDonation: "2023-02-28",
      },
      {
        name: "David Wilson",
        phone: "555-567-8901",
        lastDonation: "2023-06-05",
      },
      {
        name: "Lisa Martinez",
        phone: "555-678-9012",
        lastDonation: "2023-01-17",
      },
    ],
    "AB+": [
      {
        name: "Robert Taylor",
        phone: "555-789-0123",
        lastDonation: "2023-05-30",
      },
    ],
  };

  // Show donor info section
  donorInfo.classList.remove("hidden");
  bloodTypeSpan.textContent = bloodType;

  // Clear previous donor list
  donorList.innerHTML = "";

  // Add donors to the list
  if (donors[bloodType] && donors[bloodType].length > 0) {
    donors[bloodType].forEach((donor) => {
      const donorElement = document.createElement("div");
      donorElement.className = "border-b border-gray-200 pb-2";
      donorElement.innerHTML = `
                        <p class="font-medium">${donor.name}</p>
                        <p>Phone: ${donor.phone}</p>
                        <p>Last Donation: ${donor.lastDonation}</p>
                    `;
      donorList.appendChild(donorElement);
    });
  } else {
    const nodonorElement = document.createElement("p");
    nodonorElement.textContent = "No donors available for this blood type.";
    donorList.appendChild(nodonorElement);
  }
}

// Team Modal Functions
function openTeamModal() {
  document.getElementById("teamModal").style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

function closeTeamModal() {
  document.getElementById("teamModal").style.display = "none";
  document.body.style.overflow = "auto"; // Re-enable scrolling
}

// Canteen Menu Modal Functions
function openCanteenModal() {
  document.getElementById("canteenModal").style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

function closeCanteenModal() {
  document.getElementById("canteenModal").style.display = "none";
  document.body.style.overflow = "auto"; // Re-enable scrolling
}

// Blood Donor Modal Functions
function openBloodModal(bloodType) {
  const modal = document.getElementById("bloodDonorModal");
  const modalBloodType = document.getElementById("modalBloodType");
  const donorList = document.getElementById("modalDonorList");

  // Set the blood type in the modal header
  modalBloodType.textContent = bloodType;

  // Sample donor data - in a real app, this would come from a database
  const donors = {
    "A+": [
      {
        name: "John Smith",
        department: "Computer Science",
        phone: "555-123-4567",
      },
      {
        name: "Emily Johnson",
        department: "Business Administration",
        phone: "555-234-5678",
      },
      {
        name: "Michael Wilson",
        department: "Electrical Engineering",
        phone: "555-345-6789",
      },
    ],
    "B+": [
      {
        name: "Michael Brown",
        department: "Architecture",
        phone: "555-345-6789",
      },
      {
        name: "Jessica Lee",
        department: "Computer Science",
        phone: "555-456-7890",
      },
    ],
    "O+": [
      {
        name: "Sarah Davis",
        department: "Pharmacy",
        phone: "555-456-7890",
      },
      {
        name: "David Wilson",
        department: "Law",
        phone: "555-567-8901",
      },
      {
        name: "Lisa Martinez",
        department: "Computer Science",
        phone: "555-678-9012",
      },
    ],
    "AB+": [
      {
        name: "Robert Taylor",
        department: "Business Administration",
        phone: "555-789-0123",
      },
    ],
    "A-": [
      {
        name: "Jennifer Garcia",
        department: "Architecture",
        phone: "555-890-1234",
      },
    ],
    "B-": [
      {
        name: "Thomas Anderson",
        department: "Electrical Engineering",
        phone: "555-901-2345",
      },
    ],
    "O-": [
      {
        name: "Patricia Moore",
        department: "Law",
        phone: "555-012-3456",
      },
      {
        name: "James Johnson",
        department: "Computer Science",
        phone: "555-123-4567",
      },
    ],
    "AB-": [
      {
        name: "Elizabeth White",
        department: "Pharmacy",
        phone: "555-234-5678",
      },
    ],
  };

  // Clear previous donor list
  donorList.innerHTML = "";

  // Add donors to the modal
  if (donors[bloodType] && donors[bloodType].length > 0) {
    donors[bloodType].forEach((donor) => {
      const donorCard = document.createElement("div");
      donorCard.className = "donor-card";

      donorCard.innerHTML = `
          <div class="donor-name">${donor.name}</div>
          <div class="donor-info">${donor.department}</div>
          <div class="donor-info">Phone: ${donor.phone}</div>
        `;

      donorList.appendChild(donorCard);
    });
  } else {
    const noDonorsMessage = document.createElement("div");
    noDonorsMessage.className = "text-center py-8";
    noDonorsMessage.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4M12 4v16" />
        </svg>
        <p class="text-lg font-medium text-gray-600">No donors available for ${bloodType} blood type.</p>
      `;
    donorList.appendChild(noDonorsMessage);
  }

  // Show the modal
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

function closeBloodModal() {
  document.getElementById("bloodDonorModal").style.display = "none";
  document.body.style.overflow = "auto"; // Re-enable scrolling
}

// Optional: Close dropdown when clicking outside
document.addEventListener("click", function (e) {
  const toggle = document.getElementById("dropdownToggle");
  const menu = document.getElementById("dropdownMenu");
  if (!toggle.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.add("hidden");
  }
});

// Dropdown
function toggleDropdown() {
  const dropdown = document.getElementById("dropdownMenu");
  const toggleBtn = document.getElementById("dropdownToggle");

  const isVisible = !dropdown.classList.contains("hidden");

  if (isVisible) {
    dropdown.classList.add("hidden");
    document.removeEventListener("click", handleOutsideClick);
    document.removeEventListener("scroll", closeOnScroll, true);
  } else {
    dropdown.classList.remove("hidden");
    setTimeout(() => {
      document.addEventListener("click", handleOutsideClick);
      document.addEventListener("scroll", closeOnScroll, true);
    }, 0);
  }

  function handleOutsideClick(e) {
    if (!dropdown.contains(e.target) && !toggleBtn.contains(e.target)) {
      dropdown.classList.add("hidden");
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("scroll", closeOnScroll, true);
    }
  }

  function closeOnScroll() {
    dropdown.classList.add("hidden");
    document.removeEventListener("click", handleOutsideClick);
    document.removeEventListener("scroll", closeOnScroll, true);
  }
}

// CGPA Calculator JavaScript
function openCgpaModal() {
  document.getElementById("cgpaCalculatorModal").style.display = "block";
}

function closeCgpaModal() {
  document.getElementById("cgpaCalculatorModal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const courseNameInput = document.getElementById("courseName");
  const creditHoursInput = document.getElementById("creditHours");
  const gradeSelect = document.getElementById("gradeSelect");
  const addCourseBtn = document.getElementById("addCourseBtn");
  const coursesList = document.getElementById("coursesList");
  const noCourses = document.getElementById("noCourses");
  const calculateCgpaBtn = document.getElementById("calculateCgpaBtn");
  const resetCgpaBtn = document.getElementById("resetCgpaBtn");
  const cgpaResult = document.getElementById("cgpaResult");
  const motivationalMessage = document.getElementById("motivationalMessage");

  let courses = [];

  // Add course to the list
  addCourseBtn.addEventListener("click", function () {
    const courseName = courseNameInput.value.trim();
    const creditHours = parseFloat(creditHoursInput.value);
    const gradeValue = gradeSelect.value;
    const gradeText = gradeSelect.options[gradeSelect.selectedIndex].text;

    if (!courseName || isNaN(creditHours) || !gradeValue) {
      alert("Please fill in all fields");
      return;
    }

    const course = {
      name: courseName,
      credits: creditHours,
      grade: parseFloat(gradeValue),
      gradeText: gradeText,
    };

    courses.push(course);
    updateCoursesList();

    // Reset inputs
    courseNameInput.value = "";
    creditHoursInput.value = "3";
    gradeSelect.selectedIndex = 0;
    courseNameInput.focus();
  });

  // Update the courses list in the table
  function updateCoursesList() {
    if (courses.length === 0) {
      noCourses.style.display = "block";
      coursesList.innerHTML = "";
      return;
    }

    noCourses.style.display = "none";
    coursesList.innerHTML = "";

    courses.forEach((course, index) => {
      const row = document.createElement("tr");

      // Determine grade class
      let gradeClass = "";
      if (course.gradeText === "A+") gradeClass = "grade-a-plus";
      else if (course.gradeText === "A") gradeClass = "grade-a";
      else if (course.gradeText === "A-") gradeClass = "grade-a-minus";
      else if (course.gradeText === "B+") gradeClass = "grade-b-plus";
      else if (course.gradeText === "B") gradeClass = "grade-b";
      else if (course.gradeText === "B-") gradeClass = "grade-b-minus";
      else if (course.gradeText === "C+") gradeClass = "grade-c-plus";
      else if (course.gradeText === "C") gradeClass = "grade-c";
      else if (course.gradeText === "D") gradeClass = "grade-d";
      else if (course.gradeText === "F") gradeClass = "grade-f";

      row.innerHTML = `
        <td class="py-2 px-4 text-sm">${course.name}</td>
        <td class="py-2 px-4 text-sm text-center">${course.credits}</td>
        <td class="py-2 px-4 text-sm text-center">
          <span class="grade-badge ${gradeClass}">${course.gradeText}</span>
        </td>
        <td class="py-2 px-4 text-sm text-center">
          <i class="fa-solid fa-trash delete-course" data-index="${index}"></i>
        </td>
      `;

      coursesList.appendChild(row);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll(".delete-course").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        courses.splice(index, 1);
        updateCoursesList();
      });
    });
  }

  // Calculate CGPA
  calculateCgpaBtn.addEventListener("click", function () {
    if (courses.length === 0) {
      alert("Please add at least one course");
      return;
    }

    let totalCredits = 0;
    let totalGradePoints = 0;

    courses.forEach((course) => {
      totalCredits += course.credits;
      totalGradePoints += course.grade * course.credits;
    });

    const cgpa = totalGradePoints / totalCredits;
    cgpaResult.textContent = cgpa.toFixed(2);

    // Show motivational message below CGPA
    if (cgpa >= 3.75) {
      motivationalMessage.textContent = `🌟 Excellent! Your CGPA is ${cgpa.toFixed(
        2
      )} — Keep up the outstanding work! 🚀`;
    } else if (cgpa >= 3.0) {
      motivationalMessage.textContent = `👍 Good job! Your CGPA is ${cgpa.toFixed(
        2
      )} — Keep pushing to reach higher! 💪`;
    } else if (cgpa >= 2.0) {
      motivationalMessage.textContent = `🙂 Your CGPA is ${cgpa.toFixed(
        2
      )} — Stay focused, improvement is within reach! 🎯`;
    } else {
      motivationalMessage.textContent = `⚠️ Your CGPA is ${cgpa.toFixed(
        2
      )} — Don't give up! Seek help and keep trying! 💡`;
    }
  });

  // Reset everything
  resetCgpaBtn.addEventListener("click", function () {
    courses = [];
    updateCoursesList();
    cgpaResult.textContent = "0.00";
    motivationalMessage.textContent = "";
    courseNameInput.value = "";
    creditHoursInput.value = "3";
    gradeSelect.selectedIndex = 0;
  });

  // Initialize
  updateCoursesList();
});
