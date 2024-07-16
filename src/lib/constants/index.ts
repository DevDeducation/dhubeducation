import type { iReview, iSector } from "$lib"

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
  REGISTRATION = "registration",
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

export const reviews: iReview[] = [
  {
      "name": "clarence olympio",
      "image": "https://lh3.googleusercontent.com/a-/ALV-UjW95vrX4sSrbhM50EtRrA7VWUdOba6UpM3EoRwzbsP-uSELbMw=s40-c-rp-mo-br100",
      "rating": "5",
      "review": "With Dhub Education, I had a truly wonderful experience. They offered me essential assistance and direction all the way through my journey, from the day I made the decision to study abroad until the day I arrived at my destination. I highly advise anyone thinking about studying abroad to explore Dhub Education. They stand out thanks to their committed crew, meticulous attention to detail, and dedication to the welfare of the pupils. They helped make my dream of studying abroad a reality, and I wouldn't think twice about picking them again.Clarence from Ghana 🇬🇭<br/>With Dhub Education, I had a truly wonderful experience. They offered me essential assistance and direction all the way through my journey, from the day I made the decision to study abroad until the day I arrived at my destination. I highly advise anyone thinking about studying abroad to explore Dhub Education. They stand out thanks to their committed crew, meticulous attention to detail, and dedication to the welfare of the pupils. They helped make my dream of studying abroad a reality, and I wouldn't think twice about picking them again.Clarence from Ghana 🇬🇭"
  },
  {
      "name": "Motolani Teibo",
      "image": "https://lh3.googleusercontent.com/a/ACg8ocLe3mczX4TJRL1GBccAU4uuhy39gSniG2xsug_5Z5BvqTk4Og=s40-c-rp-mo-br100",
      "rating": "5",
      "review": "My experience with with Dhub Education was amazing ,from the on set , Damilola took up my son's case and she delivered promptly from the school application, up to the visa application. She responded to worrisome question at all time and the reassurance from her was fantastic.The professionalism showed during the visa application was great, and the final results brought happiness to my family.Many thanks .<br/>My experience with with Dhub Education was amazing ,from the on set , Damilola took up my son's case and she delivered promptly from the school application, up to the visa application. She responded to worrisome question at all time and the reassurance from her was fantastic.The professionalism showed during the visa application was great, and the final results brought happiness to my family.Many thanks ."
  },
  {
      "name": "Avuwakoghene Rume",
      "image": "https://lh3.googleusercontent.com/a-/ALV-UjU5jYpCE9L2JCfba3dyrxCoIVsMpAS-AIQlcejFxBdas1gu94XZ=s40-c-rp-mo-br100",
      "rating": "5",
      "review": "I’d like to thank DHUB education for all the assistance during my MMU application and it was a huge success. Tested and trusted. 100% reliable"
  },
  {
      "name": "T'z Mhizta MARCELO",
      "image": "https://lh3.googleusercontent.com/a-/ALV-UjVDBaD_fNLSSJ_qTy2l4Sv1befyvO_DSyEWQfi0i5YBhFs70bEZ=s40-c-rp-mo-br100",
      "rating": "5",
      "review": "Dhub Education is the best reliable platform to help you gain admission in any university and schools of your choice around the world,I'm currently a product of testimony applying through Dhub Education to gain admission into Middlesex University London.I will always advice everyone of you to choose Dhub Education to secure international students admition to any school around the globe.Regards,@Marcelo<br/>Dhub Education is the best reliable platform to help you gain admission in any university and schools of your choice around the world,I'm currently a product of testimony applying through Dhub Education to gain admission into Middlesex University London.I will always advice everyone of you to choose Dhub Education to secure international students admition to any school around the globe.Regards,@Marcelo"
  },
  {
      "name": "Ekene Obi",
      "image": "https://lh3.googleusercontent.com/a-/ALV-UjWebWZWVpd1JKSySggnCgFBkEKgYGoxffVdM-g5HPFZKXNLFM9a=s40-c-rp-mo-br100",
      "rating": "5",
      "review": "Dhub's service is top notch and standard. They have a good agent/client relationship. They are patient and knows there job very well. I recommend their services."
  },
  {
      "name": "Winnie Schola",
      "image": "https://lh3.googleusercontent.com/a/ACg8ocIo0Klo2itxQMs-52BRjt9qFw3MBtDrcN_Hi-oQV5cBUUrP7g=s40-c-rp-mo-br100",
      "rating": "5",
      "review": "I had great service and friendly communication with Dhub Education. The are very Compassionate and Understanding. The gave it all to Satisfy Me. The are the Best in United kingdomPositive Communication, Quality, Professionalism, Value"
  },
  {
      "name": "Chinyere OmeniNzewuihe",
      "image": "https://lh3.googleusercontent.com/a/ACg8ocKmZZv48sRcgIp1TiMyLWDNQUDFrw6P8b3HTW-bzMd1b7Snbg=s40-c-rp-mo-br100",
      "rating": "5",
      "review": "You are sure to get the best result with Dhub Education. I highly recommend them."
  },
  {
      "name": "Gloria Adelaja",
      "image": "https://lh3.googleusercontent.com/a/ACg8ocLjDTKBrleJMn90WBRmkb9g2creOUBZTYhpaF18iPRr9GRYyw=s40-c-rp-mo-br100",
      "rating": "5",
      "review": "The best of all, they really help me throughout the whole process and now I'm in UK"
  },
  {
      "name": "MICHAEL MUKAILA",
      "image": "https://lh3.googleusercontent.com/a-/ALV-UjWaV6AQdqeV6IZmxSRwdWauDXQNOfSRGEQPIka13rrVOCPb374I=s40-c-rp-mo-br100",
      "rating": "5",
      "review": "Thanks for the support and guide I received from you guys. Definitely referring someone."
  }
]