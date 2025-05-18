/**
 * تحويل التاريخ الهجري إلى ميلادي
 * @param hijriDate التاريخ الهجري بصيغة نصية (مثال: "20‏/11‏/1446 هـ 7:39:23 م")
 * @returns التاريخ الميلادي بصيغة نصية
 */
export function convertHijriToGregorian(hijriDate: string): string {
  try {
    // استخراج مكونات التاريخ الهجري
    const dateParts = hijriDate.split(" ")
    const dateOnly = dateParts[0].replace(/‏/g, "") // إزالة علامات التشكيل
    const [day, month, year] = dateOnly.split("/").map((part) => Number.parseInt(part, 10))

    // استخراج الوقت إذا كان موجودًا
    let timeStr = ""
    if (dateParts.length > 2) {
      timeStr = dateParts[2] + (dateParts.length > 3 ? " " + dateParts[3] : "")
    }

    // تحويل التاريخ الهجري إلى ميلادي باستخدام خوارزمية تقريبية
    // هذه خوارزمية تقريبية وليست دقيقة 100%
    const hijriYear = year
    const hijriMonth = month
    const hijriDay = day

    // تحويل التاريخ الهجري إلى عدد الأيام منذ بداية التقويم الهجري
    const h = hijriYear
    const m = hijriMonth
    const d = hijriDay

    // حساب عدد الأيام منذ بداية التقويم الهجري
    const hijriDays = Math.floor((h - 1) * 354.367) + Math.floor((m - 1) * 29.5) + d

    // تحويل إلى تاريخ ميلادي (تقريبي)
    // الفرق بين بداية التقويم الهجري والميلادي هو حوالي 622.5 سنة ميلادية
    const gregorianDays = hijriDays + 227015 // تقريبًا 622.5 * 365

    // تحويل عدد الأيام إلى تاريخ ميلادي
    const gregorianDate = new Date(gregorianDays * 24 * 60 * 60 * 1000)

    // تنسيق التاريخ الميلادي
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }

    // استخدام التنسيق العربي أو الإنجليزي حسب الحاجة
    return gregorianDate.toLocaleDateString("ar-SA", options)
  } catch (error) {
    console.error("Error converting Hijri date:", error)
    // في حالة حدوث خطأ، نعيد التاريخ الميلادي الحالي
    return (
      new Date().toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) + " (تقريبي)"
    )
  }
}

/**
 * تحويل التاريخ الميلادي إلى هجري
 * @param gregorianDate التاريخ الميلادي كـ Date object
 * @returns التاريخ الهجري بصيغة نصية
 */
export function convertGregorianToHijri(gregorianDate: Date): string {
  try {
    // تحويل التاريخ الميلادي إلى عدد الأيام منذ بداية التقويم الميلادي
    const gregorianDays = Math.floor(gregorianDate.getTime() / (24 * 60 * 60 * 1000))

    // تحويل إلى تاريخ هجري (تقريبي)
    const hijriDays = gregorianDays - 227015 // تقريبًا 622.5 * 365

    // حساب السنة الهجرية
    const hijriYear = Math.floor(hijriDays / 354.367) + 1

    // حساب الشهر الهجري
    const daysInYear = hijriDays - Math.floor((hijriYear - 1) * 354.367)
    const hijriMonth = Math.min(12, Math.ceil(daysInYear / 29.5))

    // حساب اليوم الهجري
    const daysInMonth = daysInYear - Math.floor((hijriMonth - 1) * 29.5)
    const hijriDay = Math.min(30, Math.round(daysInMonth))

    // أسماء الأشهر الهجرية
    const hijriMonthNames = [
      "محرم",
      "صفر",
      "ربيع الأول",
      "ربيع الثاني",
      "جمادى الأولى",
      "جمادى الآخرة",
      "رجب",
      "شعبان",
      "رمضان",
      "شوال",
      "ذو القعدة",
      "ذو الحجة",
    ]

    // تنسيق التاريخ الهجري
    return `${hijriDay} ${hijriMonthNames[hijriMonth - 1]} ${hijriYear} هـ`
  } catch (error) {
    console.error("Error converting Gregorian date:", error)
    return "تاريخ غير معروف"
  }
}
