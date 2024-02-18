import { AttributeValues, Attributes, Classes, Constants, ElementQueries, Elements, type DateTimeFormatOptions, type TCollection, type iButtonOptions, type iMedia, type iSession, type TAlert, Alerts, type iAlert, type iReferee, REFEREESTATUS, type iStatusColor, type TPlayMedia, type iPopup, type iPopupState, type iSlider, newsletter } from "$lib";
import type { Writable } from "svelte/store";

export class Utils {

  private btClasses: string[] = [
    "flex",
    "items-center",
    "p-2",
    "sm:w-8",
    "sm:h-8",
    "sm:p-0",
    "sm:justify-center",
    "text-xs",
    "font-medium",
    "text-dm-850",
    "bg-white",
    "relative",
    "rounded-lg",
    "dark:bg-dark-700",
    "focus:outline-none",
    "dark:text-white",
    "dark:border-darker",
    "dark:hover:text-white",
    "shadow-custom",
  ]

  
  el = (query: string, parent?: HTMLElement) => parent ? parent.querySelector(query) : document.querySelector(query)
  all = (query: string, parent?: HTMLElement) => parent ? parent.querySelectorAll(query) : document.querySelectorAll(query)

  num2List = (num: number) => Array.from({ length: num }, (_, i) => i);

  constructor() {
  }


  modal() {

    const modalEl = this.el(ElementQueries.MODALQUERY) as HTMLElement
    const modalHeaderEl = this.el(ElementQueries.MODALHEADER) as HTMLElement
    const modalFooterEl = this.el(ElementQueries.MODALFOOTER) as HTMLElement
    const modalIframeEl = this.el(Elements.IFRAME, modalEl) as HTMLIFrameElement
    const modalAudioEl = this.el(Elements.AUDIO, modalEl) as HTMLAudioElement
    const modalImageEl = this.el(Elements.IMAGE, modalEl) as HTMLImageElement
    const modalNewsletterEl = this.el(Elements.NEWSLETTER, modalEl) as HTMLImageElement

    return {
      modalEl, modalHeaderEl, modalFooterEl, modalIframeEl, modalAudioEl, modalImageEl, modalNewsletterEl
    }
  }

  getBtnClasses(remove?: string[], add?: string[]) {
    let classes: string[] = []
    if (remove) {
      this.btClasses.forEach(item => (!remove.includes(item)) && classes.push(item))
    }

    add && add.forEach(item => classes.push(item));

    (!remove && !add) && (classes = [...this.btClasses])

    return classes
  }

  obtainYouTubeID(link: string) {
    const url = new URL(link)
    const search = url.search.split("?v=")
    let searchTarget = ""
    if (search[1] && search[1].length > 0) {
      searchTarget = search[1].split("&t=")[0]
    }
    const pieces = url.pathname.split("/")

    let id = ""
    if (searchTarget && searchTarget.length > 0) id = searchTarget
    if (pieces[2] && pieces[2].length > 0) id = pieces[2]
    return id
  }

  youTubeEmbedLin(link: string) {
    if (link.length > 0) {
      const id = this.obtainYouTubeID(link)
      return `https://www.youtube.com/embed/${id}?rel=0`
    }
    return ""
  }

  youTubeThumbnail(link: string) {
    const id = this.obtainYouTubeID(link)
    return `https://img.youtube.com/vi/${id}/0.jpg`
  }

  toggleMobileNav () {
    document.body.classList.toggle(Constants.OPEN)
  }

  btnClasses = (options: iButtonOptions) => {
    const { padding, height, otherclasses, width, borderradius } = options
    return [
      width ? width : "w-full md:w-fit",
      height,
      otherclasses,
      borderradius ? borderradius : "rounded-lg",
      `bg-primary hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700`,
      padding ? padding : "px-6 py-3",
      "font-medium uppercase leading-normal text-white",
      "focus:outline-none focus:ring-0",
      "bt-primary",
      "flex",
      "items-center",
      "justify-center",
      "gap-2",
      "relative",
      "shadow-custom"
    ];
  };

  urlParams() {
    const url = new URL(location.href)
			const json = Object.fromEntries(url.searchParams.entries())
			if (!json.redirectTo) {
				json.redirectTo = url.pathname
			}
			const searchParams = new URLSearchParams(json).toString()
			return { url, params: `?${searchParams}` }
  }

  setLs(key: string, data: string) {
    localStorage.setItem(key, data)
  }

  getLs(key: string) {
    return localStorage.getItem(key)
  }

  formatDate(date: Date) {
    const options: DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  fileSize(file: File) {
    const fileSizeInBytes = file.size
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024)
    return fileSizeInMB
  }

  
  async getList (name: string) {
    const response = await fetch(`/api/${name}`)
    const data = await response.json()
    return data
  }

  async getReferees(url: string, email: string) {
    const response = await fetch(`/api/${url}`, {
			method: 'POST',
			body: JSON.stringify({ email }),
			headers: {
				'content-type': 'application/json',
			},
		});
    const data = await response.json()
    return data
  }
  
  handlePopup(popup: iPopup) {
    const startTimestamp = +new Date(popup.startdate)
    const endTimestamp = +new Date(popup.enddate)
    const now = Date.now()
    const isLive = now >= startTimestamp && now < endTimestamp
    return {isLive, startTimestamp, popup }
  }

  hasShownPopup() {
    const lsTimestamp = this.getLs(Constants.POPUPSTAMP)
    if (!lsTimestamp) {
      return false
    }

    const now = new Date()
    now.setHours(0,0,0,0)
    const nowStamp = (+now).toString()
    const lsStamp = this.getLs(Constants.POPUPSTAMP)
    
    return nowStamp === lsStamp
  }

  setPopupStamp() {
    const now = new Date()
    now.setHours(0,0,0,0)
    this.setLs(Constants.POPUPSTAMP, (+now).toString())
  }

  handleModal(name: TPlayMedia, mediaStr: string) {

    gtag(Constants.EVENT, Constants, {
      'title': name,
      'name': name,
      'sermon_date': new Date().toLocaleString()
    });
    const { modalEl } = this.modal()

    const media = JSON.parse(mediaStr) as iMedia

    console.trace(media)

    if (modalEl.classList.contains(Classes.HIDDEN)) {
      if (!this.hasShownPopup()) {
        this.showMedia(media).playMedia(media, name)
      }
    } else {
      this.resetAudioAndVideo().hideMedia().setPopupStamp()
    }
  }
  resetAudioAndVideo() {
    const { modalIframeEl, modalAudioEl } = this.modal()
    modalIframeEl.setAttribute("src", "")
    modalAudioEl.setAttribute("src", "")
    const source = modalAudioEl.querySelector("source")
    source?.setAttribute("src", "")
    return this
  }

  showMedia(media: iMedia) {
    const { modalEl, modalHeaderEl, modalFooterEl } = this.modal()
    modalEl.classList.remove(Classes.HIDDEN) 
    
    modalHeaderEl.textContent = media.header
    modalFooterEl.textContent = media.footer
    return this
  }

  hideMedia() {
    const { modalEl, modalHeaderEl, modalFooterEl } = this.modal()
    modalEl.classList.add(Classes.HIDDEN)
    modalHeaderEl.textContent = ""
    modalFooterEl.textContent = ""
    return this
  }

  playMedia(media: iMedia, name: TPlayMedia) {
    switch (name) {
      case AttributeValues.PLAYVIDEO: return this.playVideo(media)
      case AttributeValues.PLAYAUDIO: return this.playAudio(media)
      case AttributeValues.PLAYIMAGE: return this.playImage(media)
      case AttributeValues.PLAYNEWSLETTER: return this.playNewsletter(media)
    }
  }
  
  playVideo(media: iMedia) {
    const { modalIframeEl, modalAudioEl, modalImageEl, modalNewsletterEl } = this.modal()
    modalIframeEl.setAttribute("src", this.youTubeEmbedLin(media.src))
    modalIframeEl.style.display = "block"
    modalAudioEl.style.display = "none"
    modalImageEl.style.display = "none"
    modalNewsletterEl.style.display = "none"
  }

  playNewsletter(media: iMedia) {
    const { modalImageEl, modalIframeEl, modalAudioEl, modalNewsletterEl } = this.modal() 
    modalNewsletterEl.style.display = "flex"
    modalIframeEl.style.display = "none"
    modalAudioEl.style.display = "none"
    modalImageEl.style.display = "none"
  }

  playImage(media: iMedia) {
    const { modalImageEl, modalIframeEl, modalAudioEl, modalNewsletterEl } = this.modal()
    const imageEl = utils.el('img', modalImageEl) as HTMLImageElement
    imageEl.src = media.src
    modalIframeEl.style.display = "none"
    modalAudioEl.style.display = "none"
    modalNewsletterEl.style.display = "none"
    modalImageEl.style.display = "flex"
  }

  playAudio(media: iMedia) {
    const { modalAudioEl, modalIframeEl, modalImageEl, modalNewsletterEl } = this.modal()
    const source = modalAudioEl.querySelector("source")
    modalAudioEl.setAttribute("src", media.src)
    source?.setAttribute("src", media.src)

    modalIframeEl.style.display = "none"
    modalImageEl.style.display = "none"
    modalNewsletterEl.style.display = "none"
    modalAudioEl.style.display = "block"
  }
  sentenceCase(word: string) {
    if (typeof word !== 'string') {
      throw new Error('Input must be a string');
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  slugify(str: string) {
    return str.split('/').at(-1)?.replace('.md', '')
  }
  whatsapp(record: Record<string, any>) {
    return `Hello Dhub Education,\n\nMy name is ${record.name}.\n\nKindly find below more details about me:\n- First name: ${record.name}\n- Surname: ${record.surname}\n- Phone Number: ${record.phoneNumber}\n- Email: ${record.email}\n- Country of interest: ${record.countryOfInterest}\n- Level of study: ${record.levelOfStudy}\n- Year of entry: ${record.yearOfEntry}\n- Document I already have: ${record.documents}\n\n${record.note}\n\nI look forward to hearing from you.`
  }
  formURL(entries: Record<string, string>, base: string) {
    const url = new URL(base)
    Object.keys(entries).map(key => url.searchParams.append(key, entries[key]))
    return url
  }
  formatErrorMessage (message: string) {
    const split = message.split("auth/")
    let str = split.length > 1 ? split[1] : split[0]
    return (str as string).replace(")", "")
  }
  setAlert(message: string, type: TAlert, store: Writable<iAlert>) {
    store.update(value => value = { type, message, active: true })
    setTimeout(() => store.update(value => value = { type: Alerts.INFO, message: "", active: false }), 5000);
  }
  handleButtonClick (evt: Event) {
    const target = evt.target as HTMLElement
    const parent = target.parentElement as HTMLElement
    parent.classList.add(Classes.LOADING)
  }

  stringToUniqueNumber(inputString: string) {
    let hash = 0;
    if (inputString.length === 0) return hash;
  
    for (let i = 0; i < inputString.length; i++) {
      const char = inputString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
  
    return Math.abs(hash); // Make the number positive
  }

  uniqueNumberToString(uniquePositiveNumber: number) {
    let result = '';
    while (uniquePositiveNumber > 0) {
      const charCode = uniquePositiveNumber % 256;
      result = String.fromCharCode(charCode) + result;
      uniquePositiveNumber = (uniquePositiveNumber - charCode) / 256;
    }
    return result;
  }

  encodeString(str: string) {
    return btoa(str)
  }

  decodeString(str: string) {
    return atob(str)
  }
  
	handleBack (evt: Event) {
		const target = evt.target as HTMLElement
		const parent = target.parentElement as HTMLElement
		window.history.back()
		parent.classList.add(Classes.LOADING)
	}

  flag(code: string) {
    return `https://purecatamphetamine.github.io/country-flag-icons/3x2/${code.toUpperCase()}.svg`
  }

  status(referee: iReferee): iStatusColor {
    if(referee.paid)
      return { status: REFEREESTATUS.PAID, color: "bg-secondary text-white dark:bg-white dark:text-secondary" }
    if (referee.confirmed)
      return { status: REFEREESTATUS.CONFIRMED, color: "bg-orange-500 text-white dark:bg-white dark:text-orange-500" }
    
    return { status: REFEREESTATUS.ADDED, color: "bg-blue-500 text-white dark:bg-white dark:text-blue-500" }
  }
}

export const utils = new Utils()

export const links = {
  company: {
    name: "company",
    submenu: [
      { name: "About", url: "/about-us", arialabel: "about" },
      { name: "Partners", url: "/partners", arialabel: "partners" },
      { name: "Blog", url: "/blog", arialabel: "universities" },
      { name: "Contact Us", url: "/contact-us", arialabel: "contact us" },
    ],
  },
  services: {
    name: "services",
    submenu: [
      { name: "Tuition Payment", url: "/services/tuition-payment", arialabel: "tuition payment" },
      { name: "Accommodation", url: "/services/accommodation", arialabel: "accommodation" },
      { name: "Affiliate Program", url: "/affiliate-program", arialabel: "affiliate" },
      { name: "All Services", url: "/services", arialabel: "all services" },
    ],
  },
  legal: {
    name: "legal", 
    submenu: [
      { name: "Terms of Use", url: "/terms-of-use", arialabel: "terms of use" },
      { name: "Privacy Policy", url: "/privacy", arialabel: "privacy policy" },
      { name: "Cookie Policy", url: "/cookie-policy", arialabel: "cookie policy" },
      { name: "Sitemap", url: "/sitemap.xml", arialabel: "sitemap" }
    ],
  },
  followus: {
    name: "follow us",
    submenu: [
      {
        name: "facebook",
        url: "https://www.facebook.com/mydhubeducation/"
      },
      {
        name: "instagram",
        url: "https://www.instagram.com/mydhubeducation/"
      },
      {
        name: "telegram",
        url: "https://t.me/+EFfR1U0_BakwNjlk"
      },
      {
        name: "twitter",
        url: "https://twitter.com/DhubEducation"
      },
      {
        name: "whatsapp",
        url: "https://api.whatsapp.com/send?phone=+447930739927&text=Hello"
      },
      {
        name: "tiktok",
        url: "https://www.tiktok.com/@mydhubeducation?_t=8jGuYP4VdSK&_r=1"
      },
    ]
  }
}

export const dkmap = "/images/school-map_desktop.webp?w=300;500;700;900;1300&format=webp;avif&as=picture";
export const mbmap1 = "/images/school-map_mobile_1.webp?w=300;500;700;900;1300&format=webp;avif&as=picture";
export const mbmap2 = "/images/school-map_mobile_2.webp?w=300;500;700;900;1300&format=webp;avif&as=picture";

export const handleClick = async (evt: Event) => {
  const target = evt.target as HTMLElement
  const name = target.getAttribute(Attributes.DATANAME) as TPlayMedia
  const mediaStr = target.getAttribute(Attributes.DATAMEDIA) as string

  const res = await fetch('/api/popups')
  const popups = await res.json() as iPopup[] 
  const popup = popups[0]

  const media: iMedia = {
    footer: "",
    header: popup.name,
    src: popup.image
  }

  switch (name) {
    case "play-image":
      popup 
      ? utils.handleModal("play-image", JSON.stringify(media))
      : utils.handleModal("play-newsletter", JSON.stringify(newsletter))
      break;
    default:
      utils.handleModal(name, mediaStr)
      break;
  }


}


export const imgparams = '?w=300;500;700;900;1300&format=webp;avif&as=picture'

// your import statement
const DK = import.meta.env.VITE_IMAGE_TOOL ? import.meta.env.VITE_IMAGE_TOOL(dkmap + imgparams) : { url: dkmap };

export { DK };

export const getMetadata = (paths: Record<string, any>) => {

  const objList = []
  for (const path in paths) {
    const file = paths[path] as Record<string, any>
    const slug = utils.slugify(path) as string

    if (
      file && 
      typeof file === 'object' && 
      'metadata' in file && 
      slug
    ) {
      const metadata = file.metadata as Omit<iSlider, 'slug'>
      objList.push({ ...metadata })
    }
  }

  return objList
}

export const getDescription = (str: string) => `${str} (study abroad, international education, study abroad programs, study overseas, study abroad scholarships, study abroad destinations, study abroad opportunities, study abroad experiences, study abroad benefits, best countries to study abroad, study abroad universities, study abroad consultants, study abroad costs, study abroad tips, study abroad application process, study abroad grants, study abroad internships, study abroad reviews, study abroad experiences blog) #studyabroadlife #studentlife #education #studymotivation #educationconsultant #educationagency #viral #trend #reels #reelsinstagram #canadian #studyincanada #studentaccommodation #studenthousing #canada 🇨🇦 #canada #nigerians #nigeriansincanada #immigration #london #unitedkingdom #immigrationcanada #pr`

export const getOgImage = (partialImage: string) => `${Constants.DOMAIN}${partialImage}`

export const educationlist = [
  { value: 'a-level', label: 'A-Level' },
  { value: 'foundation', label: 'Foundation' },
  { value: 'hnd', label: 'HND' },
  { value: 'ond', label: 'OND' },
  { value: 'top up', label: 'Top Up' },
  { value: 'bsc', label: 'BSc' },
  { value: 'pre-msc', label: 'Pre-MSc' },
  { value: 'msc', label: 'MSc' },
  { value: 'phd', label: 'PhD' }
];


export const countrylist = [
  { value: 'malta', label: 'Malta' },
  { value: 'france (paris)', label: 'France (Paris)' },
  { value: 'united kingdom', label: 'United Kingdom' },
  { value: 'netherland', label: 'Netherland' },
  { value: 'canada', label: 'Canada' },
];