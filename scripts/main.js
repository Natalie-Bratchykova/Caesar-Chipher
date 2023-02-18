import CaesarEncrypt from "./Caesar-Chipher/CaesarEncrypt.js";
import CaesarDecrypt from "./Caesar-Chipher/CaesarDecrypt.js";
import BruteForce from "./Caesar-Chipher/BruteForce.js";
// -----------------------------------------------------------
// intro block
const sectionIntro = document.querySelector(".intro-block");
const btnStart = document.querySelector(".start-btn");
const sectionMenu = document.querySelector(".menu-block");
const sectionIntroTitles = document.querySelector(".intro-block__titles");
// scoll to menu
const scrollToElement = (futherElement) => {
  futherElement.classList.remove("hidden");
  futherElement.scrollIntoView({ behavior: "smooth" });
};

const scrollBack = (currentElement, backElement) => {
  backElement.classList.remove("hidden");
  backElement.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    currentElement.classList.add("hidden");
  }, 600);
};

btnStart.addEventListener("click", (e) => {
  scrollToElement(sectionMenu);
});

//------------------------------------------------------------
// menu section
const btnGoToTestEncrypt = document.querySelector("#btnGoToTestEncrypt");
const btnGoToEncryptFiles = document.querySelector("#btnGoToEncryptFiles");
const btnGoToTestDecrypt = document.querySelector("#btnGoToTestDecrypt");
const btnGoToDecryptFiles = document.querySelector("#btnGoToDecryptFiles");
const btnExit = document.querySelector("#exit");
const sectionTestEncrypt = document.querySelector(".test-encryption-block");
// go to encrypt test
btnGoToTestEncrypt.addEventListener("click", (e) => {
  scrollToElement(sectionTestEncrypt);
});

const sectionEncryptFiles = document.querySelector(".encrypt-files");
// go to encrypt files
btnGoToEncryptFiles.addEventListener("click", (e) => {
  scrollToElement(sectionEncryptFiles);
});
const sectionTestDecrypt = document.querySelector(".test-decryption-block");
// go to decrypt test
btnGoToTestDecrypt.addEventListener("click", (e) => {
  scrollToElement(sectionTestDecrypt);
});

const sectionDecryptFiles = document.querySelector(".decrypt-files");
// go to decrypt files
btnGoToDecryptFiles.addEventListener("click", (e) => {
  scrollToElement(sectionDecryptFiles);
});
// exit
btnExit.addEventListener("click", (e) => {
  scrollBack(sectionMenu, sectionIntroTitles);
});

//===============================================================
// do chipher
const doChipher = (inputedText, key, outputPlace, isEncryption) => {
  if (inputedText.value === "") {
    alert("Please, input something");
  } else {
    if (isEncryption) {
      outputPlace.textContent = new CaesarEncrypt(
        inputedText.value,
        Number(key.value)
      ).encryptedText;
    } else {
      outputPlace.textContent = new CaesarDecrypt(
        inputedText.value,
        Number(key.value)
      ).decryptedText;
    }
  }
};

// do reset value
const resetInputedData = (inputText, key, outputPlace) => {
  inputText.value = "";
  key.value = "";
  outputPlace.textContent = " Result  will appear here";
};

// create file function
const createFile = (fileContent, fileType, fileTitle) => {
  const createdFile = new Blob([fileContent.value], {
    type: "text/plain",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(createdFile);
  link.download = `${fileTitle}.${fileType}`;
  link.click();
  URL.revokeObjectURL(link.href);
};
//==============================================================
// test encryption section
const inputTestEncryptText = document.querySelector("#input-encrypt");
const inputTestEncryptKey = document.querySelector("#input-key-encrypt");
const btnTestEncrypt = document.querySelector("#btnTestEncrypt");
const btnBackToMenu = document.querySelector("#back-to-menu");
const outputTestEncrypt = document.querySelector("#encryption-result");

btnTestEncrypt.addEventListener("click", (e) => {
  doChipher(inputTestEncryptText, inputTestEncryptKey, outputTestEncrypt, true);
});

btnBackToMenu.addEventListener("click", (e) => {
  scrollBack(sectionTestEncrypt, sectionMenu);
  resetInputedData(
    inputTestEncryptText,
    inputTestEncryptKey,
    outputTestEncrypt,
    false
  );
});

// test decryption section
const inputTestDecryptText = document.querySelector("#input-decrypt");
const inputTestDecryptKey = document.querySelector("#input-key-decrypt");
const btnTestDecrypt = document.querySelector("#btnTestDecrypt");
const btnBackToMenuTestDecrypt = document.querySelector("#back-to-menu1");
const outputTestDecrypt = document.querySelector("#decryption-result");

// decrypt test
btnTestDecrypt.addEventListener("click", (e) => {
  doChipher(inputTestDecryptText, inputTestDecryptKey, outputTestDecrypt);
});
// back to menu
btnBackToMenuTestDecrypt.addEventListener("click", (e) => {
  scrollBack(sectionTestDecrypt, sectionMenu);
  resetInputedData(
    inputTestDecryptText,
    inputTestDecryptKey,
    outputTestDecrypt
  );
});
//=====================================================================
const createFileIU = (
  saveAndCreateBTN,
  createFilePOPUP,
  fileTitle,
  inputFileType,
  backToMenuBTN,
  fileTextContent,
  createFileBNT,
  cancelBTN,
  currentSection
) => {
  const btnCreateAndSaveFile = document.querySelector(saveAndCreateBTN);
  const createFilePopup = document.querySelector(createFilePOPUP);
  const createFileTitle = document.querySelector(fileTitle);
  const createFileExtentionChoices = document.querySelectorAll(inputFileType);
  const btnBackToMenuEncryptionFile = document.querySelector(backToMenuBTN);
  const createFileContent = document.querySelector(fileTextContent);
  const btnCreateFile = document.querySelector(createFileBNT);
  const btnCreateFileCancel = document.querySelector(cancelBTN);
  const workingSecrion = currentSection;

  // OPEN POP UP
  btnCreateAndSaveFile.addEventListener("click", (e) => {
    createFilePopup.classList.remove("hidden");
  });
  // BACK TO MENU
  btnBackToMenuEncryptionFile.addEventListener("click", (e) => {
    scrollBack(currentSection, sectionMenu);
  });
  // CANCEL CREATING FILE
  btnCreateFileCancel.addEventListener("click", (e) => {
    createFilePopup.classList.add("hidden");
    createFileTitle.value = "";
    createFileContent.value = "";
    createFileExtentionChoices.forEach((choice) => {
      if (choice.checked && choice.id !== "txt") {
        choice.checked = false;
      }
    });
  });
  // CREATE FILE BTN
  btnCreateFile.addEventListener("click", (e) => {
    let confirmation = true;
    if (createFileTitle.value === "") {
      alert("Name your file");
    } else if (createFileContent.value === "") {
      confirmation = confirm(
        "Your file is empty. Are you sure to leave it like this?"
      )
        ? true
        : false;
    }
    //--------------------------------------------------
    // ENCRYPTION:  save file as pop up
    else if (confirmation) {
      let createdFileType = "";
      createFileExtentionChoices.forEach((item) => {
        if (item.checked) {
          createdFileType = item.id;
        }
      });
      createFile(createFileContent, createdFileType, createFileTitle.value);
    }
  });
};
//--------------------------------------------------
// show file modifications
const changeFileNameAndSave = (fileTitle, fileText, fileStatus) => {
  let [title, extention] = fileTitle.textContent.split(".");
  title += fileStatus;
  fileTitle.textContent = `${title}.${extention}`;
  createFile(fileText, extention, title);
};
const editFileUI = (
  editFilePOPUP,
  closeEditPopupBTN,
  fileName,
  fileTextContent,
  saveFileBTN,
  encryptEditFileBTN,
  openFileEncryptBTN,
  settingKeyPOPUP,
  closeSettingKeyBTN,
  inputSettingKey,
  finalEncryptOpenedFileBTN,
  isEncryption
) => {
  const editFilePopup = document.querySelector(editFilePOPUP);
  const btnCloseEditFilePopup = document.querySelector(closeEditPopupBTN);
  const editFileTitle = document.querySelector(fileName);
  const editFileText = document.querySelector(fileTextContent);
  const btnEditFileSave = document.querySelector(saveFileBTN);
  const btnEditFileEncrypt = document.querySelector(encryptEditFileBTN);
  const btnOpenFileEncrypt = document.querySelector(openFileEncryptBTN);
  const setKeyEncryptedFilePopUp = document.querySelector(settingKeyPOPUP);
  const btnCloseEditFileKeySetting = document.querySelector(closeSettingKeyBTN);
  const inputSetKeyForEncryption = document.querySelector(inputSettingKey);
  const bntEncryptOpenedFile = document.querySelector(
    finalEncryptOpenedFileBTN
  );
  // ENCRYPTION:  open file as pop up

  btnOpenFileEncrypt.addEventListener("change", (e) => {
    const filereader = new FileReader();
    const currentFile = btnOpenFileEncrypt.files[0];
    if (
      currentFile.name.includes(".txt") ||
      currentFile.name.includes(".doc") ||
      currentFile.name.includes(".docs")
    ) {
      filereader.readAsText(currentFile);
      // ENCRYPTION:  edit file as pop up
      if (btnOpenFileEncrypt.value !== "") {
        editFilePopup.classList.remove("hidden");
        editFileTitle.textContent = currentFile.name;
        filereader.onload = () => (editFileText.value = filereader.result);
      }
    } else {
      btnOpenFileEncrypt.value = "";
      alert("Sorry, you chose not text file😞");
    }
  });
  btnCloseEditFilePopup.addEventListener("click", () => {
    editFilePopup.classList.add("hidden");
    btnOpenFileEncrypt.value = "";
  });
  // save encrypted/edited file
  btnEditFileSave.addEventListener("click", () => {
    changeFileNameAndSave(editFileTitle, editFileText, "-edited");
  });
  // ENCRYPTION:  encrypt edited file

  // open encryption setting
  btnEditFileEncrypt.addEventListener("click", () => {
    setKeyEncryptedFilePopUp.classList.remove("hidden");
  });
  // close encryption settings
  btnCloseEditFileKeySetting.addEventListener("click", () => {
    setKeyEncryptedFilePopUp.classList.add("hidden");
  });
  if (isEncryption) {
    // get key value and encrypt
    bntEncryptOpenedFile.addEventListener("click", () => {
      editFileText.value = new CaesarEncrypt(
        editFileText.value,
        Number(inputSetKeyForEncryption.value)
      ).encryptedText;

      setKeyEncryptedFilePopUp.classList.add("hidden");
      changeFileNameAndSave(editFileTitle, editFileText, "-encrypted");
    });
  } else {
    // get key value and encrypt
    bntEncryptOpenedFile.addEventListener("click", () => {
      editFileText.value = new CaesarDecrypt(
        editFileText.value,
        Number(inputSetKeyForEncryption.value)
      ).decryptedText;
      setKeyEncryptedFilePopUp.classList.add("hidden");
      changeFileNameAndSave(editFileTitle, editFileText, "-decrypted");
    });
  }
};

// PRINT FILE FUNCTION
const printFileUI = (
  openPrintFile,
  printFilePoPUP,
  fileName,
  fileContent,
  closePrintFileBTN
) => {
  // print encrypted(no difference) files
  const bntPrintFile = document.querySelector(openPrintFile);
  const printFilePopup = document.querySelector(printFilePoPUP);
  const printFileTitle = document.querySelector(fileName);
  const printFileContent = document.querySelector(fileContent);
  const bntClosePrintFile = document.querySelector(closePrintFileBTN);

  bntPrintFile.addEventListener("change", () => {
    if (bntPrintFile.value !== "") {
      let reader = new FileReader();
      printFilePopup.classList.remove("hidden");
      let currentFile = bntPrintFile.files[0];
      reader.readAsText(currentFile);
      printFileTitle.textContent = currentFile.name;
      reader.onload = () => (printFileContent.value = reader.result);
      printFileContent.disabled = true;
    }
  });
  // close file print
  bntClosePrintFile.addEventListener("click", () => {
    printFilePopup.classList.add("hidden");
    bntPrintFile.value = "";
  });
};
//=====================================================================
// ENCRYPTION: create file pop up

createFileIU(
  "#btnCreateAndSaveFile",
  ".create-file-pop-up",
  "#file-name",
  'input[name="file-type"]',
  "#back-to-menu2",
  "#file-text-inner",
  "#create-file-button",
  "#create-file-cancel",
  sectionEncryptFiles
);
editFileUI(
  ".edit-file-popup",
  "#btnCloseEditFilePopup",
  ".edit-file-name",
  "#edit-file-text",
  "#btnEditFileSave",
  "#btnEditFileEncrypt",
  "#open-file",
  ".encrypt-edited-file",
  "#btnCloseEditFileKeySetting",
  "#edit-file-encrypt-key",
  "#btnEditFileDoEncrypt",
  true
);
printFileUI(
  "#print-file",
  ".show-printed-file",
  ".print-file-title",
  ".file-inner",
  "#bntClosePrintFile"
);

//==========================================================================================================================
// DECRYPTION
// CREATE FILE
createFileIU(
  "#btnCreateAndSaveFileDecrypt",
  ".create-file-decrypt",
  "#file-name-decrypt",
  "input[type = 'file-type-decrypt']",
  "#back-to-menu-decryption",
  "#file-text-inner-decrypt",
  "#create-file-button-decryption",
  "#create-file-cancel-decryption",
  sectionDecryptFiles
);
// OPEN AND EDIT
editFileUI(
  "#edit-file-popup-decrypt",
  "#btnCloseEditFilePopupDecrypt",
  ".edit-file-name-decrypt",
  "#edit-file-text-decrypt",
  "#btnEditFileSaveDecrypt",
  "#btnEditFileDecrypt",
  "#open-decrypt",
  ".decrypt-edited-file",
  "#btnCloseEditFileKeySettingDecrypt",
  "#edit-file-decrypt-key",
  "#btnEditFileDoDecrypt",
  false
);
// PRINT FILE
printFileUI(
  "#print-file-decrypt",
  ".print-decrypted-file",
  "#print-file-title",
  ".file-inner-decrypt",
  "#bntClosePrintFile1"
);

// BRUTE FORCE
const btnGoToBruteForce = document.querySelector("#btnGoToBruteForce");
const sectionBruteForce = document.querySelector(".brute-force-section");
const btnBackToMenuBruteForce = document.querySelector("#bruteForceBackToMenu");
const inputBruteEncryptedText = document.querySelector(
  "#brute-force-input-textArea"
);
const btnBruteForce = document.querySelector("#bruteForce");
const outputBruteForce = document.querySelector("#brute-force-output-textArea");
// scroll to brute force
btnGoToBruteForce.addEventListener("click", () => {
  scrollToElement(sectionBruteForce);
});

// back to menu
btnBackToMenuBruteForce.addEventListener("click", () => {
  scrollBack(sectionBruteForce, sectionMenu);
  inputBruteEncryptedText.value = "";
  outputBruteForce.value = "";
});

// do brute force
btnBruteForce.addEventListener("click", () => {
  console.log("clicked");
  if (inputBruteEncryptedText.value !== "") {
    console.log("input ok");
    let bruteForce = new BruteForce(inputBruteEncryptedText.value);
    const result = bruteForce.doBruteForce();
    console.log("Brute:" + bruteForce.doBruteForce(outputBruteForce.value));
    console.log("brute ok");
    outputBruteForce.value = result;
  }
});
