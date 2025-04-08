// 쓰레기통

const globalState = {
  playerGo: "black",
  board: {
    viewAs: "white",
    flip: () => {
      if (this.viewAs === "white") {
        viewAs = "black";
      } else {
        viewAs = "white";
      }
    }
  },
  BLACK: {
    isChecked: false,
    toggleCheck: () => {
      if(this.isChecked) {
        isChecked = false;
      } else {
        isChecked = true;
      }
    },
  },
  WHITE: {
    isChecked: false,
    toggleCheck: () => {
      if(this.isChecked) {
        isChecked = false;
      } else {
        isChecked = true;
      }
    },
  },
};

export default globalState;
