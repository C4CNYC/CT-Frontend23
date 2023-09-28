import html2canvas from "html2canvas";

export const getImageFromCode = async (code: string) => {
  const element = document.createElement("div");
  try {
    element.innerHTML = code;

    element.style.position = "absolute";
    element.style.top = "0px";
    element.style.left = "0px";
    element.style.width = "100%";
    element.style.height = "100%";
    element.style.zIndex = "-1";
    document.body.appendChild(element);

    const canvas = await html2canvas(element);
    document.body.removeChild(element);
    const response = await fetch(canvas.toDataURL("image/png"));
    const blob = await response.blob();
    return new File([blob], "cover.png", { type: "image/png" });
  } catch (error) {
    console.log(error.data.message);
    return null;
  }
};
