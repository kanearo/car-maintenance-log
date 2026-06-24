const storageKey = "carMaintenanceRecords";

const maintenanceForm = document.getElementById("maintenance-form");
const formMessage = document.getElementById("form-message");
const recordsList = document.getElementById("records-list");
const recordCount = document.getElementById("record-count");
const clearRecordsButton = document.getElementById("clear-records-button");

const vehicleInput = document.getElementById("vehicle");
const serviceTypeInput = document.getElementById("service-type");
const serviceDateInput = document.getElementById("service-date");
const mileageInput = document.getElementById("mileage");
const costInput = document.getElementById("cost");
const providerInput = document.getElementById("provider");
const notesInput = document.getElementById("notes");

function getSavedRecords() {
  const savedText = localStorage.getItem(storageKey);

  if (savedText === null) {
    return [];
  }

  return JSON.parse(savedText);
}

function saveRecords(records) {
  localStorage.setItem(storageKey, JSON.stringify(records));
}

function showMessage(messageText, messageType) {
  formMessage.textContent = messageText;
  formMessage.className = `message ${messageType}`;
}

function buildRecordFromForm() {
  return {
    id: Date.now(),
    vehicle: vehicleInput.value.trim(),
    serviceType: serviceTypeInput.value.trim(),
    serviceDate: serviceDateInput.value,
    mileage: mileageInput.value.trim(),
    cost: costInput.value.trim(),
    provider: providerInput.value.trim(),
    notes: notesInput.value.trim()
  };
}

function checkRecord(record) {
  if (
    record.vehicle === "" ||
    record.serviceType === "" ||
    record.serviceDate === "" ||
    record.mileage === "" ||
    record.cost === "" ||
    record.provider === ""
  ) {
    return "Please fill in all required fields.";
  }

  const mileageNumber = Number(record.mileage);
  const costNumber = Number(record.cost);

  if (Number.isNaN(mileageNumber) || mileageNumber < 0) {
    return "Mileage must be a valid non-negative number.";
  }

  if (Number.isNaN(costNumber) || costNumber < 0) {
    return "Cost must be a valid non-negative number.";
  }

  return "";
}

function formatCost(cost) {
  return Number(cost).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

function addDetail(card, labelText, valueText) {
  const detail = document.createElement("div");
  detail.className = "record-detail";

  const label = document.createElement("strong");
  label.textContent = labelText;

  const value = document.createElement("span");
  value.textContent = valueText;

  detail.appendChild(label);
  detail.appendChild(value);
  card.appendChild(detail);
}

function showRecords() {
  const records = getSavedRecords();
  recordsList.innerHTML = "";

  recordCount.textContent = `${records.length} ${records.length === 1 ? "record" : "records"}`;

  if (records.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-message";
    emptyMessage.textContent = "No maintenance records have been saved yet.";
    recordsList.appendChild(emptyMessage);
    return;
  }

  records.forEach(function (record) {
    const recordCard = document.createElement("article");
    recordCard.className = "record-card";

    const recordTitle = document.createElement("h3");
    recordTitle.textContent = `${record.serviceType} - ${record.vehicle}`;

    const details = document.createElement("div");
    details.className = "record-details";

    addDetail(details, "Date", record.serviceDate);
    addDetail(details, "Mileage", `${Number(record.mileage).toLocaleString()} miles`);
    addDetail(details, "Cost", formatCost(record.cost));
    addDetail(details, "Provider", record.provider);
    addDetail(details, "Notes", record.notes || "None");

    recordCard.appendChild(recordTitle);
    recordCard.appendChild(details);
    recordsList.appendChild(recordCard);
  });
}

maintenanceForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const newRecord = buildRecordFromForm();
  const errorMessage = checkRecord(newRecord);

  if (errorMessage !== "") {
    showMessage(errorMessage, "error");
    return;
  }

  const records = getSavedRecords();
  records.push(newRecord);
  saveRecords(records);

  maintenanceForm.reset();
  showMessage("Maintenance record saved.", "success");
  showRecords();
});

clearRecordsButton.addEventListener("click", function () {
  localStorage.removeItem(storageKey);
  showMessage("All records were cleared.", "success");
  showRecords();
});

showRecords();
