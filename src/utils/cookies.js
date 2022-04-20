// 주어진 이름의 쿠키를 반환하는데
// 조건에 맞는 쿠키가 없다면 undefined를 반환합니다.
export function getCookie(name) {
  // 쿠키 값을 가져옵니다.
  let value = "; " + document.cookie;
  // 키 값을 기준으로 파싱합니다.
  let parts = value.split("; " + name + "=");
  // value를 return!
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(";").shift());
  }
}

export function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    // 필요한 경우, 옵션 기본값을 설정할 수도 있습니다.
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function deleteCookie(name) {
  setCookie(name, "", {
    "max-age": -1,
  });
}
