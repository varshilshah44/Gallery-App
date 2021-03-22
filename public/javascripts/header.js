const onprofile = () => {
  location.href = `/profile?userid=${localStorage.getItem("userid")}`;
};

const onphotoes = () => {
  location.href = `/dashboard?userid=${localStorage.getItem(
    "userid"
  )}&type=image`;
};

const onvideos = () => {
  location.href = `/videos?userid=${localStorage.getItem("userid")}&type=video`;
};

const onlogout = () => {
  location.href = "/";
};
