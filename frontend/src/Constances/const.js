export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const WAREHOUSE_ID = process.env.REACT_APP_WAREHOUSE_ID;

export const ONE_HOUR = 3600e3;
export const ONE_DAY = 24 * ONE_HOUR;
export const LOCALSTORAGE = {
  TOKEN: 'token',
  USER: 'user'
}
export const ERR_MSG = {
  EMAIL: "Sai định dạng email, vui lòng kiểm tra lại",
  REQUIRED: "*",
  MIN: "Giá trị phải lớn hơn: ",
  MAX: "Giá trị phải nhỏ hơn: ",
  MIN_LENGTH: "Độ dài phải lớn hơn: ",
  MAX_LENGTH: "Độ dài phải nhỏ hơn: ",
  P_TEL: "Vui lòng kiểm tra lại số điện thoại",
  P_DATE: "Sai định dạng thời gian, vui lòng kiểm tra lại",
  CF_PASSWORD: "Mật khẩu không trùng nhau",
};
export const ORDER_STATUS = {
  NEW : "new",
  DONE : "done"
} 
export const USER_STATUS = {
  ACTIVE:'đang làm việc',
  INACTIVE:'đã nghỉ việc'
  
} 

export const REPORT_OPTION = {
  EXPORT: "export",
  IMPORT: "import",
  REMAIN: "remain",
}
export const FOOD_TYPE = [
  { 
    label: "Đồ khô",
    value: "dry"
  },
  {
    label: "Đồ tươi",
    value: "raw"
  }
]

export const FOOD_UNIT = [
  { 
    label: "Kg",
    value: "kg"
  },
  {
    label: "Lọ",
    value: "bottle"
  },
  {
    label: "Hộp",
    value: "box"
  },
  {
    label: "Cái",
    value: "piece"
  },
  {
    label: "Gói",
    value: "pack"
  }
]

export const HEADERS = ["Tên LT, TP", "ĐVT", "SL", "ĐG", "TT"]

export const WAREHOUSE_TRANSACTION_TYPE = {
  LotTotal : "lot_total",     // thay doi tong kho ( xa kho )
  LotRemain : "lot_remain",   // thay doi ton kho ( xuat kho )
  LotChange : "lot_change",   // thay doi ca tong va ton ( nhap kho)
}

export const EQUAL_ARRAY = (a, b) => {
    if (Array.isArray(a) === false || Array.isArray(b) === false) {
      return `${a} or ${b} not array`
    }
    if (a.length !== b.length) {
      return false;
    }
    const result = a.every((elA, index) => elA === b[index]);
    return result;
}

export const convertCtime = (ctime ,option="simple") =>{
  let date = "";
  const time = new Date(ctime);
  if (option === "simple") {
    date = time.toLocaleDateString("en-gb");
  } 
  if (option === "full") {
    date = time.toLocaleDateString("en-gb");
    const hour = time.getHours();
    const min = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
    date += ` - ${hour}:${min}`
  }
  return date
}

export const FORMAT_PRICE = (number) => {
  return new Intl.NumberFormat('de-DE').format(number)
}

export const removeVietnameseTones = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    return str;
}

export const CheckEmptyChar = (string) => {
  if (typeof string === "string") {
    return string.trim().length === 0 ? true : false
  }
  return true;
}

export const GetNameUser = (string) => {
  const arrStr = string.split(" ");
  return `${arrStr.pop()}  `;
}