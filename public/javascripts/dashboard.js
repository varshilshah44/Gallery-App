let file = [];
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img01");

const onimgclick = (e) => {
  modal.style.display = "block";
  modalImg.src = e.src;
}

const onimgclose = () => {
  modal.style.display = "none";
}

const checkFileExtension = (name) => {
  const index = name.lastIndexOf(".");
  let ext = name.substr(index, name.length);
  ext = ext.toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".gif") {
    return true;
  }
  return false;
};

const checkVideoExtension = (name) => {
  const index = name.lastIndexOf(".");
  let ext = name.substr(index, name.length);
  ext = ext.toLowerCase();
  if (ext === ".mp4" || ext === ".mov" || ext === ".wmv" || ext === ".fiv") {
    return true;
  }
  return false;
};

const onaddmedia = async (type, path) => {
  let flag = 0;
  const fd = new FormData();
  if (file.length === 0) {
    alert("Please select the image");
  } else {
    if (type === "image") {
      for (let i = 0; i < file.length; i++) {
        if (checkFileExtension(file[i].name)) {
          fd.append("image", file[i]);
        } else {
          flag = 1;
          alert(
            "File extension not valid : Valid only '.jpg, .jpeg, .gif, .png' "
          );
          document.getElementById("file").value = "";
          file=[];
          break;
        }
      }
    } else {
      for (let i = 0; i < file.length; i++) {
        if (checkVideoExtension(file[i].name)) {
          fd.append("image", file[i]);
        } else {
          flag = 1;
          alert(
            "Video extension not valid : Valid only '.mp4, .mov, .wmv, .flv' "
          );
          document.getElementById('file').value = ''
          file=[];
          break;
        }
      }
    }
    if (flag === 0) {
      fd.append("type", type);
      fd.append("user", localStorage.getItem("userid"));

      const response = await axios.post(
        `${window.location.origin}/api/media/add`,
        fd,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.data.status === "success") {
        location.href = `/${path}?userid=${localStorage.getItem(
          "userid"
        )}&type=${type}`;
      } else {
        alert(response.data.message);
      }
    }
  }
};

const onchoosefile = (target) => {
  for (let i = 0; i < target.files.length; i++) {
    file.push(target.files[i]);
  }
};

const onmediadelete = async (mediaid, type, path) => {
  const answer = confirm("You want to delete?");
  if (answer) {
    const response = await axios.delete(
      `${window.location.origin}/api/media/media-remove/${mediaid}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (response.data.status === "success") {
      location.href = `/${path}?userid=${localStorage.getItem(
        "userid"
      )}&type=${type}`;
    } else {
      alert(response.data.message);
    }
  }
};

const onfavourite = async (mediaid) => {
  const res = await axios.get(
    `${window.location.origin}/api/media/get-media/${mediaid}`,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  if (!res.data.media.isFavorite) {
    const response = await axios.put(
      `${window.location.origin}/api/media/isfavourite/${mediaid}`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (response.data.status === "success") {
      alert("added to favourite");
    } else {
      alert(response.data.message);
    }
  } else {
    alert("already added");
  }
};

const onremovefavourite = async (mediaid, type, path) => {
  const response = await axios.put(
    `${window.location.origin}/api/media/isfavourite/${mediaid}`,
    {},
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  if (response.data.status === "success") {
    alert("removed from favourite");
    location.href = `/${path}?userid=${localStorage.getItem(
      "userid"
    )}&isfavourite=${true}&type=${type}`;
  } else {
    alert(response.data.message);
  }
};

const viewfavourite = (type, path) => {
  location.href = `/${path}?userid=${localStorage.getItem(
    "userid"
  )}&isfavourite=${true}&type=${type}`;
};

const onback = (type, path) => {
  location.href = `/${path}?userid=${localStorage.getItem(
    "userid"
  )}&type=${type}`;
};
