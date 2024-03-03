import type { iSector } from "$lib"

export enum Events {
  CLICK = "click",
  SUBMIT = "submit",
  CHANGE = "change",
  MOUSEOVER = "mouseover",
  MOUSEOUT = "mouseout",
  COUNTRYCHANGE = "countrychange"
}

export enum Attributes {
  DATANAME = "data-name",
  DATASRC = "data-src",
  DATAMEDIA = "data-media",
  VALUE = "value",
  CHECKED = "checked",
  DATALINK = "data-link",
  DATAENCODED = "data-encoded"
}

export enum AttributeValues {
  EDIT = "edit",
  DELETE = "delete",
  HAMBURGER = "hamburger",
  DARKMODETOGGLE = "dark-mode-toggle",
  HEROBUTTON = "hero-btn",
  PLAYVIDEO = "play-video",
  PLAYAUDIO = "play-audio",
  PLAYIMAGE = "play-image",
  PLAYNEWSLETTER = "play-newsletter",
  MODALHEADER = "modal-header",
  MODALFOOTER = "modal-footer",
  MODALOVERLAY = "modal overlay",
  ENQUIRYBTN = "enquiry btn",
  SIGNINBTN = "signin btn",
  REGISTERBTN = "register btn",
  GOOGLESIGNINBTN = "google signin btn",
  SIGNOUTBTN = "signout btn",
  DOCUMENT = "document",
  SIDENAVIGATION = "side navigation"
}

export enum Elements {
  AUDIO = "audio",
  IFRAME = "iframe",
  IMAGE = ".img",
  NEWSLETTER = "#newsletterPopup",
}

export enum THEME {
  DARK = "dark",
  LIGHT = "light",
}

export enum CONTEXT {
  THEME = "theme"
}

export enum Classes {
  ISACTIVE = "is-active",
  HIDDEN = "hidden",
  FLEX = "flex",
  W4H4 = "w-4 h-4",
  LOADING = "-loading",
}

export enum ElementQueries {
  MODALQUERY = "#modal",
  MODALHEADER = '[data-name="modal-header"]',
  MODALFOOTER = '[data-name="modal-footer"]',
  PICTUREUPLOAD = '#picture',
  PICTUREUPLOADSTATUS = 'small[aria-label="uploadstatus"]'
}

export enum REFEREESTATUS {
  CONFIRMED = "confirmed",
  ADDED = "added",
  PAID = "paid"
}

export enum Collection {
  COURSES = "courses",
  SERVICES = "services",
  AFFILIATES = "affiliates",
  SUBSCRIBERS = "subscribers",
  FINANCE = "finance",
  REFEREES = "referees",
  SLIDES = "slides",
  BLOG = "blog",
  SCHOOLS = "schools",
  USERS = "users",
  PARTNERS = "partners",
  CONTACT = "contact"
}

export const Flags = {
  FALSE: false,
  TRUE: true,
}

export enum Constants {
  WHATSAPPAPI = "https://api.whatsapp.com/send",
  DHUBEDUCATION_GMAIL = "dhubeducation@gmail.com",
  DOMAIN = "https://dhubeducation.com",
  BACKGROUND_IMAGE = "/uploads/slides/homepage/dhub_1600x900.webp",
  DHUBEDUCATION_PHONE = "+447930739927",
  WHATSAPP_CLICKTOCHAT = "https://wa.me/+447930739927?text=Hello",
  UNITPAYOUT = "100",
  REDIRECTTO = "redirectTo",
  POPUPSTAMP = "popupstamp",
  MAP = "map",
  USERSCOLLECTION = "users",
  TWITTER = "twitter",
  LINKEDIN = "linkedin",
  FACEBOOK = "facebook",
  TIKTOK = "tiktok",
  INSTAGRAM = "instagram",
  YOUTUBE = "youtube",
  TELEGRAM = "telegram",
  WHATSAPP = "whatsapp",
  AFFILIATESIGNIN = "affiliate_signin",
  EVENT = "event",
  ENQUIRY = "enquiry",
  ENQUIRIES = "enquiries",
  USERS = "users",
  BACK = "back",
  CLICKABLE = "clickable",
  USER = "USER",
  OPEN = "open",
  GOOGLE = "GOOGLE",
  EMAILANDPASSWORD = "EMAILANDPASSWORD",
  REFERER = "referer",
  TOOLTIPID="#tooltip",
  TOCOPY=".tocopy",
  BANK = "bank",
  PAYPAL = "paypal",
  HOMEPAGESLIDERS="homepagesliders"
}

export enum GSEvents {
  
}

export enum Dashboard {
  REFEREESADDED = "added",
  REFEREESCONFIRMED = "confirmed",
  REFEREESPAID = "paid",
  PAYOUT = "payout"
}

export enum Affiliates {
  CUSTOMER = "customer",
  VENDOR = "vendor",
  TEACHER = "teacher",
  INFLUENCER = "influencer",
  EMPLOYEE = "employee"
}

export enum Alerts {
  SUCCESS = "success",
  INFO = "info",
  ERROR = "error",
  WARNING = "warning"
}

export enum FormDataKeys {
  FILE = 'file',
  APIKEY = 'api_key',
  SIGNATURE = 'signature',
  TIMESTAMP = 'timestamp'
}

export const media = { header: 'Dhub Education', src: 'https://www.youtube.com/watch?v=X4YjevmMt5U', footer: 'Mrs. Dami Ewetuga' }
export const newsletter = { header: 'Subscribe to our newsletter', src: '', footer: '' }

export const uxbridgeCollege1 = {
  header: "Official Partner",
  src: "https://www.youtube.com/watch?v=yzLAfVPajxk",
  footer: "Uxbridge College",
};

export const popup = {
  header: "12 Days of Christmas",
  src: "/images/12_13_2023_12DaysToChristmas.webp",
  footer: "",
};


const ourservices = "/images/our-services.webp"
const ourteam = "/images/our-team.webp"
const ourvision = "/images/our-vision-b.webp"
const about = "/images/about.webp" 

export const sectors: iSector[] = [
	{ name: "Who we are", img: about, content: "Dhub Education is a leading education consultant dedicated to providing unparalleled support and guidance to international students and universities worldwide. Our team of committed individuals works tirelessly to offer expert advice and assistance, ensuring a seamless educational journey from foundation level to Ph.D." },
	{ name: "Why we are here", img: ourvision, content: "At Dhub Education, our vision is clear - to create a distinguished quality service for all students, with a special emphasis on science students and education providers. We believe in fostering self-discovery, knowledge construction, and transformation, empowering each student to make the best university choices with ease and support." }, 
	{ name: "What we do", img: ourservices, content: "We specialize in guiding your educational journey with a comprehensive suite of services tailored to your individual needs. From helping you find the perfect school that fits your goals and budget, to providing valuable insights on managing educational expenses, ensuring a safe and nurturing environment for students away from home, offering expert advice on course selection, assisting in finding comfortable living arrangements, to navigating complex visa processes for a seamless transition - our range of services is designed to support every aspect of your educational experience. And that's just the beginning." },
	{ name: "The Team", img: ourteam, content: "Our team at Dhub Education comprises passionate individuals with diverse backgrounds, including education, healthcare, business development, and more. We unite under a common ambition: to address the world's most pressing health issues. With our combined expertise, we are committed to building an educational platform that produces the next generation of healthcare professionals and NHS heroes. With a focus on science-based education, Dhub Education is uniquely positioned to guide students towards fulfilling careers in nursing and other healthcare-related fields. Our dedicated team ensures that every student receives personalized guidance and support throughout their educational journey." },
]