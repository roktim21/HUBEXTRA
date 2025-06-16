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

// Close modal when clicking outside of it
window.onclick = function (event) {
  const modal = document.getElementById("teamModal");
  if (event.target == modal) {
    closeTeamModal();
  }
};

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

// Update the window.onclick function to include the blood modal
window.onclick = function (event) {
  const teamModal = document.getElementById("teamModal");
  const bloodModal = document.getElementById("bloodDonorModal");

  if (event.target == teamModal) {
    closeTeamModal();
  }

  if (event.target == bloodModal) {
    closeBloodModal();
  }
};
