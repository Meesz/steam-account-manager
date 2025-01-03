document
  .getElementById("account-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submission prevented.");

    const accountName = document.getElementById("account-name").value.trim();
    const accountPassword = document
      .getElementById("account-password")
      .value.trim();

    console.log("Account Name:", accountName);
    console.log("Account Password:", accountPassword);

    // Validate form inputs
    if (!accountName || !accountPassword) {
      alert("Please fill in both the account name and password.");
      console.log("Validation failed: Missing account name or password.");
      return;
    }

    const account = {
      accountName,
      accountPassword,
    };

    console.log("Account object created:", account);

    try {
      const response = await window.api.saveAccount(account);
      console.log("Response from saveAccount:", response);

      if (response.success) {
        alert("Account added successfully!");
        document.getElementById("account-form").reset();
        console.log("Form reset after successful account addition.");
      } else {
        alert("Failed to add account: " + (response.error || "Unknown error"));
        console.log("Failed to add account:", response.error || "Unknown error");
      }
    } catch (error) {
      alert("Error saving account: " + error.message);
      console.log("Error saving account:", error.message);
    }
  });
