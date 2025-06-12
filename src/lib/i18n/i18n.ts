import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next"
    }
  },
  fa: {
    translation: {
      "Required": "الزامی",
      "App_name": "پولک",
      "cancel": "لغو",
      "add": "افزودن",
      "ok": "تایید",
      "loading": "در حال ارسال",
      "fault": "اشتباه است.",
      "min length is and max is 30": "حداقل طول:8 - حداکثر طول 30",
      'Enter Loan group name': "نام گروه اشتراک وامی را وارد کنید.",
      'Choose one of options': "یکی از گزینه ها را انتخاب کنید.",
      'loan min value 1000': "چطوری صفر تومن وام!!!",
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "fa",
    interpolation: {
      escapeValue: false
    }
  })

export default i18n