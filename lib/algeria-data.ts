export interface Commune {
  id: number
  name: string
  arabicName: string
}

export interface Wilaya {
  id: number
  name: string
  arabicName: string
  communes: Commune[]
}

export const algeriaWilayas: Wilaya[] = [
  {
    id: 1,
    name: "Adrar",
    arabicName: "أدرار",
    communes: [
      { id: 1, name: "Adrar", arabicName: "أدرار" },
      { id: 2, name: "Tamest", arabicName: "تمست" },
      { id: 3, name: "Charouine", arabicName: "شروين" },
      { id: 4, name: "Reggane", arabicName: "رقان" },
      { id: 5, name: "Inzghmir", arabicName: "إنزغمير" }
    ]
  },
  {
    id: 2,
    name: "Chlef",
    arabicName: "الشلف",
    communes: [
      { id: 1, name: "Chlef", arabicName: "الشلف" },
      { id: 2, name: "Oued Fodda", arabicName: "وادي الفضة" },
      { id: 3, name: "Ouled Fares", arabicName: "أولاد فارس" },
      { id: 4, name: "El Karimia", arabicName: "الكريمية" },
      { id: 5, name: "Beni Haoua", arabicName: "بني حواء" }
    ]
  },
  {
    id: 3,
    name: "Laghouat",
    arabicName: "الأغواط",
    communes: [
      { id: 1, name: "Laghouat", arabicName: "الأغواط" },
      { id: 2, name: "Ksar El Hirane", arabicName: "قصر الحيران" },
      { id: 3, name: "Hassi R'Mel", arabicName: "حاسي الرمل" },
      { id: 4, name: "Ain Madhi", arabicName: "عين ماضي" },
      { id: 5, name: "Tadjmout", arabicName: "تاجموت" }
    ]
  },
  {
    id: 4,
    name: "Oum El Bouaghi",
    arabicName: "أم البواقي",
    communes: [
      { id: 1, name: "Oum El Bouaghi", arabicName: "أم البواقي" },
      { id: 2, name: "Ain Beida", arabicName: "عين البيضاء" },
      { id: 3, name: "Ain M'lila", arabicName: "عين مليلة" },
      { id: 4, name: "Sigus", arabicName: "سقوس" },
      { id: 5, name: "F'Kirina", arabicName: "فكيرينة" }
    ]
  },
  {
    id: 5,
    name: "Batna",
    arabicName: "باتنة",
    communes: [
      { id: 1, name: "Batna", arabicName: "باتنة" },
      { id: 2, name: "Merouana", arabicName: "مروانة" },
      { id: 3, name: "Seriana", arabicName: "سريانة" },
      { id: 4, name: "Menaa", arabicName: "منعة" },
      { id: 5, name: "El Madher", arabicName: "المعذر" }
    ]
  },
  {
    id: 6,
    name: "Bejaia",
    arabicName: "بجاية",
    communes: [
      { id: 1, name: "Bejaia", arabicName: "بجاية" },
      { id: 2, name: "Akbou", arabicName: "أقبو" },
      { id: 3, name: "Souk El Tenine", arabicName: "سوق الإثنين" },
      { id: 4, name: "Tichy", arabicName: "تيشي" },
      { id: 5, name: "Amizour", arabicName: "أميزور" }
    ]
  },
  {
    id: 7,
    name: "Biskra",
    arabicName: "بسكرة",
    communes: [
      { id: 1, name: "Biskra", arabicName: "بسكرة" },
      { id: 2, name: "Ouled Djellal", arabicName: "أولاد جلال" },
      { id: 3, name: "Sidi Okba", arabicName: "سيدي عقبة" },
      { id: 4, name: "Zeribet El Oued", arabicName: "زريبة الوادي" },
      { id: 5, name: "El Outaya", arabicName: "الوطاية" }
    ]
  },
  {
    id: 8,
    name: "Bechar",
    arabicName: "بشار",
    communes: [
      { id: 1, name: "Bechar", arabicName: "بشار" },
      { id: 2, name: "Kenadsa", arabicName: "القنادسة" },
      { id: 3, name: "Abadla", arabicName: "أباضلة" },
      { id: 4, name: "Beni Ounif", arabicName: "بني ونيف" },
      { id: 5, name: "Taghit", arabicName: "تاغيت" }
    ]
  },
  {
    id: 9,
    name: "Blida",
    arabicName: "البليدة",
    communes: [
      { id: 1, name: "Blida", arabicName: "البليدة" },
      { id: 2, name: "Boufarik", arabicName: "بوفاريك" },
      { id: 3, name: "Bouinan", arabicName: "بوينان" },
      { id: 4, name: "El Affroun", arabicName: "العفرون" },
      { id: 5, name: "Larbaa", arabicName: "الأربعاء" }
    ]
  },
  {
    id: 10,
    name: "Bouira",
    arabicName: "البويرة",
    communes: [
      { id: 1, name: "Bouira", arabicName: "البويرة" },
      { id: 2, name: "Souk El Khemis", arabicName: "سوق الخميس" },
      { id: 3, name: "El Asnam", arabicName: "الأصنام" },
      { id: 4, name: "M'Chedallah", arabicName: "مشدالة" },
      { id: 5, name: "Ain Bessem", arabicName: "عين بسام" }
    ]
  },
  {
    id: 11,
    name: "Tamanrasset",
    arabicName: "تمنراست",
    communes: [
      { id: 1, name: "Tamanrasset", arabicName: "تمنراست" },
      { id: 2, name: "Abalessa", arabicName: "أبلسة" },
      { id: 3, name: "In Guezzam", arabicName: "إن غزام" },
      { id: 4, name: "In Salah", arabicName: "إن صالح" },
      { id: 5, name: "Foggaret Ezzaouia", arabicName: "فجيرة الزاوية" }
    ]
  },
  {
    id: 12,
    name: "Tebessa",
    arabicName: "تبسة",
    communes: [
      { id: 1, name: "Tebessa", arabicName: "تبسة" },
      { id: 2, name: "Bir El Ater", arabicName: "بئر العاتر" },
      { id: 3, name: "Cheria", arabicName: "الشريعة" },
      { id: 4, name: "Stah Guentis", arabicName: "ستة قنتيس" },
      { id: 5, name: "El Aouinet", arabicName: "العوينات" }
    ]
  },
  {
    id: 13,
    name: "Tlemcen",
    arabicName: "تلمسان",
    communes: [
      { id: 1, name: "Tlemcen", arabicName: "تلمسان" },
      { id: 2, name: "Beni Snous", arabicName: "بني سنوس" },
      { id: 3, name: "Remchi", arabicName: "رمشي" },
      { id: 4, name: "Bensekrane", arabicName: "بن سكران" },
      { id: 5, name: "Hennaya", arabicName: "حناية" }
    ]
  },
  {
    id: 14,
    name: "Tiaret",
    arabicName: "تيارت",
    communes: [
      { id: 1, name: "Tiaret", arabicName: "تيارت" },
      { id: 2, name: "Medroussa", arabicName: "مدروسة" },
      { id: 3, name: "Ain Deheb", arabicName: "عين الذهب" },
      { id: 4, name: "Sougueur", arabicName: "سوقر" },
      { id: 5, name: "Mahdia", arabicName: "المهدية" }
    ]
  },
  {
    id: 15,
    name: "Tizi Ouzou",
    arabicName: "تيزي وزو",
    communes: [
      { id: 1, name: "Tizi Ouzou", arabicName: "تيزي وزو" },
      { id: 2, name: "Azeffoun", arabicName: "أزفون" },
      { id: 3, name: "Ain El Hammam", arabicName: "عين الحمام" },
      { id: 4, name: "Draa El Mizan", arabicName: "ذراع الميزان" },
      { id: 5, name: "Boghni", arabicName: "بوغني" }
    ]
  },
  {
    id: 16,
    name: "Alger",
    arabicName: "الجزائر",
    communes: [
      { id: 1, name: "Alger Centre", arabicName: "الجزائر الوسطى" },
      { id: 2, name: "Sidi M'hamed", arabicName: "سيدي امحمد" },
      { id: 3, name: "El Madania", arabicName: "المدنية" },
      { id: 4, name: "El Mouradia", arabicName: "المرادية" },
      { id: 5, name: "Kouba", arabicName: "القبة" },
      { id: 6, name: "Hussein Dey", arabicName: "حسين داي" },
      { id: 7, name: "El Harrach", arabicName: "الحراش" },
      { id: 8, name: "Baraki", arabicName: "براقي" },
      { id: 9, name: "Dar El Beida", arabicName: "الدار البيضاء" },
      { id: 10, name: "Bab Ezzouar", arabicName: "باب الزوار" }
    ]
  },
  {
    id: 17,
    name: "Djelfa",
    arabicName: "الجلفة",
    communes: [
      { id: 1, name: "Djelfa", arabicName: "الجلفة" },
      { id: 2, name: "Hassi Bahbah", arabicName: "حاسي بحبح" },
      { id: 3, name: "Ain Maabed", arabicName: "عين معبد" },
      { id: 4, name: "El Idrissia", arabicName: "الإدريسية" },
      { id: 5, name: "Oum Laadham", arabicName: "أم العظام" }
    ]
  },
  {
    id: 18,
    name: "Jijel",
    arabicName: "جيجل",
    communes: [
      { id: 1, name: "Jijel", arabicName: "جيجل" },
      { id: 2, name: "El Ancer", arabicName: "العنصر" },
      { id: 3, name: "El Aouana", arabicName: "العوانة" },
      { id: 4, name: "Ziama Mansouriah", arabicName: "زيامة منصورية" },
      { id: 5, name: "Taher", arabicName: "الطاهير" }
    ]
  },
  {
    id: 19,
    name: "Setif",
    arabicName: "سطيف",
    communes: [
      { id: 1, name: "Setif", arabicName: "سطيف" },
      { id: 2, name: "El Eulma", arabicName: "العلمة" },
      { id: 3, name: "Ain Arnat", arabicName: "عين أرنات" },
      { id: 4, name: "Ain Azel", arabicName: "عين أزل" },
      { id: 5, name: "Beni Aziz", arabicName: "بني عزيز" }
    ]
  },
  {
    id: 20,
    name: "Saida",
    arabicName: "سعيدة",
    communes: [
      { id: 1, name: "Saida", arabicName: "سعيدة" },
      { id: 2, name: "El Hassasna", arabicName: "الحساسنة" },
      { id: 3, name: "Ouled Brahim", arabicName: "أولاد إبراهيم" },
      { id: 4, name: "Sidi Boubekeur", arabicName: "سيدي بوبكر" },
      { id: 5, name: "Ain El Hadjar", arabicName: "عين الحجر" }
    ]
  },
  {
    id: 21,
    name: "Skikda",
    arabicName: "سكيكدة",
    communes: [
      { id: 1, name: "Skikda", arabicName: "سكيكدة" },
      { id: 2, name: "Azzaba", arabicName: "عزابة" },
      { id: 3, name: "El Harrouch", arabicName: "الحرش" },
      { id: 4, name: "Tamalous", arabicName: "تمالوس" },
      { id: 5, name: "Ben Azzouz", arabicName: "بن عزوز" }
    ]
  },
  {
    id: 22,
    name: "Sidi Bel Abbes",
    arabicName: "سيدي بلعباس",
    communes: [
      { id: 1, name: "Sidi Bel Abbes", arabicName: "سيدي بلعباس" },
      { id: 2, name: "Tlemcen", arabicName: "تلمسان" },
      { id: 3, name: "Ain Temouchent", arabicName: "عين تموشنت" },
      { id: 4, name: "Beni Saf", arabicName: "بني صاف" },
      { id: 5, name: "Hammam Bou Hadjar", arabicName: "حمام بو حجار" }
    ]
  },
  {
    id: 23,
    name: "Annaba",
    arabicName: "عنابة",
    communes: [
      { id: 1, name: "Annaba", arabicName: "عنابة" },
      { id: 2, name: "El Bouni", arabicName: "البوني" },
      { id: 3, name: "El Hadjar", arabicName: "الحجار" },
      { id: 4, name: "Seraidi", arabicName: "سرايدي" },
      { id: 5, name: "Chetaibi", arabicName: "شطايبي" }
    ]
  },
  {
    id: 24,
    name: "Guelma",
    arabicName: "قالمة",
    communes: [
      { id: 1, name: "Guelma", arabicName: "قالمة" },
      { id: 2, name: "Hammam N'bails", arabicName: "حمام النبايل" },
      { id: 3, name: "Ain Makhlouf", arabicName: "عين مخلوف" },
      { id: 4, name: "Ain Ben Beida", arabicName: "عين بن بيضاء" },
      { id: 5, name: "Bouchegouf", arabicName: "بوشقوف" }
    ]
  },
  {
    id: 25,
    name: "Constantine",
    arabicName: "قسنطينة",
    communes: [
      { id: 1, name: "Constantine", arabicName: "قسنطينة" },
      { id: 2, name: "El Khroub", arabicName: "الخروب" },
      { id: 3, name: "Ain Smara", arabicName: "عين سمارة" },
      { id: 4, name: "Zighoud Youcef", arabicName: "زيغود يوسف" },
      { id: 5, name: "Hamma Bouziane", arabicName: "حامة بوزيان" }
    ]
  },
  {
    id: 26,
    name: "Medea",
    arabicName: "المدية",
    communes: [
      { id: 1, name: "Medea", arabicName: "المدية" },
      { id: 2, name: "Berrouaghia", arabicName: "برواقية" },
      { id: 3, name: "Ksar El Boukhari", arabicName: "قصر البخاري" },
      { id: 4, name: "Ain Boucif", arabicName: "عين بوسيف" },
      { id: 5, name: "Ouzera", arabicName: "وزرة" }
    ]
  },
  {
    id: 27,
    name: "Mostaganem",
    arabicName: "مستغانم",
    communes: [
      { id: 1, name: "Mostaganem", arabicName: "مستغانم" },
      { id: 2, name: "Sidi Ali", arabicName: "سيدي علي" },
      { id: 3, name: "Ain Nouissy", arabicName: "عين نويسي" },
      { id: 4, name: "Hadjadj", arabicName: "حجاج" },
      { id: 5, name: "Sour", arabicName: "سور" }
    ]
  },
  {
    id: 28,
    name: "M'sila",
    arabicName: "المسيلة",
    communes: [
      { id: 1, name: "M'sila", arabicName: "المسيلة" },
      { id: 2, name: "Bou Saada", arabicName: "بوسعادة" },
      { id: 3, name: "Sidi Aissa", arabicName: "سيدي عيسى" },
      { id: 4, name: "Hammam Dalaa", arabicName: "حمام الضلعة" },
      { id: 5, name: "Ouled Derradj", arabicName: "أولاد دراج" }
    ]
  },
  {
    id: 29,
    name: "Mascara",
    arabicName: "معسكر",
    communes: [
      { id: 1, name: "Mascara", arabicName: "معسكر" },
      { id: 2, name: "Sig", arabicName: "سيق" },
      { id: 3, name: "Ghriss", arabicName: "غريس" },
      { id: 4, name: "El Bordj", arabicName: "البرج" },
      { id: 5, name: "Hacine", arabicName: "حسين" }
    ]
  },
  {
    id: 30,
    name: "Ouargla",
    arabicName: "ورقلة",
    communes: [
      { id: 1, name: "Ouargla", arabicName: "ورقلة" },
      { id: 2, name: "N'Goussa", arabicName: "نقوسة" },
      { id: 3, name: "Hassi Messaoud", arabicName: "حاسي مسعود" },
      { id: 4, name: "Rouissat", arabicName: "رويسات" },
      { id: 5, name: "El Borma", arabicName: "البرمة" }
    ]
  },
  {
    id: 31,
    name: "Oran",
    arabicName: "وهران",
    communes: [
      { id: 1, name: "Oran", arabicName: "وهران" },
      { id: 2, name: "Es Senia", arabicName: "السانية" },
      { id: 3, name: "Bir El Djir", arabicName: "بئر الجير" },
      { id: 4, name: "Hassi Bounif", arabicName: "حاسي بنيف" },
      { id: 5, name: "El Kerma", arabicName: "الكرمة" },
      { id: 6, name: "Ain El Turk", arabicName: "عين الترك" },
      { id: 7, name: "Arzew", arabicName: "أرزيو" },
      { id: 8, name: "Bethioua", arabicName: "بطيوة" },
      { id: 9, name: "Marsat El Hadjadj", arabicName: "مرسى الحجاج" },
      { id: 10, name: "Ain Temouchent", arabicName: "عين تموشنت" }
    ]
  },
  {
    id: 32,
    name: "El Bayadh",
    arabicName: "البيض",
    communes: [
      { id: 1, name: "El Bayadh", arabicName: "البيض" },
      { id: 2, name: "Rogassa", arabicName: "رغاية" },
      { id: 3, name: "Stitten", arabicName: "ستيتن" },
      { id: 4, name: "Brezina", arabicName: "بريزينة" },
      { id: 5, name: "Ghassoul", arabicName: "غاسول" }
    ]
  },
  {
    id: 33,
    name: "Illizi",
    arabicName: "إليزي",
    communes: [
      { id: 1, name: "Illizi", arabicName: "إليزي" },
      { id: 2, name: "Djanet", arabicName: "جانت" },
      { id: 3, name: "Debdeb", arabicName: "دبداب" },
      { id: 4, name: "Bordj Omar Driss", arabicName: "برج عمر إدريس" },
      { id: 5, name: "In Amenas", arabicName: "إن أميناس" }
    ]
  },
  {
    id: 34,
    name: "Bordj Bou Arreridj",
    arabicName: "برج بوعريريج",
    communes: [
      { id: 1, name: "Bordj Bou Arreridj", arabicName: "برج بوعريريج" },
      { id: 2, name: "Ras El Oued", arabicName: "رأس الوادي" },
      { id: 3, name: "El Hamadia", arabicName: "الحمادية" },
      { id: 4, name: "Mansourah", arabicName: "منصورة" },
      { id: 5, name: "El Achir", arabicName: "العشير" }
    ]
  },
  {
    id: 35,
    name: "Boumerdes",
    arabicName: "بومرداس",
    communes: [
      { id: 1, name: "Boumerdes", arabicName: "بومرداس" },
      { id: 2, name: "Boudouaou", arabicName: "بودواو" },
      { id: 3, name: "Dellys", arabicName: "دلس" },
      { id: 4, name: "Khemis El Khechna", arabicName: "خميس الخشنة" },
      { id: 5, name: "Thenia", arabicName: "الثنية" }
    ]
  },
  {
    id: 36,
    name: "El Tarf",
    arabicName: "الطارف",
    communes: [
      { id: 1, name: "El Tarf", arabicName: "الطارف" },
      { id: 2, name: "Bouhadjar", arabicName: "بوحجار" },
      { id: 3, name: "Ben M'hidi", arabicName: "بن مهيدي" },
      { id: 4, name: "Besbes", arabicName: "بسباس" },
      { id: 5, name: "El Kala", arabicName: "القالة" }
    ]
  },
  {
    id: 37,
    name: "Tindouf",
    arabicName: "تندوف",
    communes: [
      { id: 1, name: "Tindouf", arabicName: "تندوف" },
      { id: 2, name: "Oum El Assel", arabicName: "أم العسل" },
      { id: 3, name: "El Menea", arabicName: "المنيعة" },
      { id: 4, name: "Zaouiet Kounta", arabicName: "زاوية كنتة" },
      { id: 5, name: "Reggane", arabicName: "رقان" }
    ]
  },
  {
    id: 38,
    name: "Tissemsilt",
    arabicName: "تيسمسيلت",
    communes: [
      { id: 1, name: "Tissemsilt", arabicName: "تيسمسيلت" },
      { id: 2, name: "Bordj Bounaama", arabicName: "برج بونعامة" },
      { id: 3, name: "Theniet El Had", arabicName: "ثنية الحد" },
      { id: 4, name: "Lazharia", arabicName: "لزهرية" },
      { id: 5, name: "Beni Chaib", arabicName: "بني شعيب" }
    ]
  },
  {
    id: 39,
    name: "El Oued",
    arabicName: "الوادي",
    communes: [
      { id: 1, name: "El Oued", arabicName: "الوادي" },
      { id: 2, name: "Robbah", arabicName: "الرباح" },
      { id: 3, name: "Oued El Alanda", arabicName: "وادي العلندة" },
      { id: 4, name: "Bayadha", arabicName: "البياضة" },
      { id: 5, name: "Nakhla", arabicName: "النخلة" }
    ]
  },
  {
    id: 40,
    name: "Khenchela",
    arabicName: "خنشلة",
    communes: [
      { id: 1, name: "Khenchela", arabicName: "خنشلة" },
      { id: 2, name: "Babar", arabicName: "بابار" },
      { id: 3, name: "Tamza", arabicName: "تمزة" },
      { id: 4, name: "Bouhmama", arabicName: "بوحمامة" },
      { id: 5, name: "El Hamma", arabicName: "الحامة" }
    ]
  },
  {
    id: 41,
    name: "Souk Ahras",
    arabicName: "سوق أهراس",
    communes: [
      { id: 1, name: "Souk Ahras", arabicName: "سوق أهراس" },
      { id: 2, name: "Sedrata", arabicName: "سدراتة" },
      { id: 3, name: "Hanancha", arabicName: "حناشة" },
      { id: 4, name: "Mechroha", arabicName: "مشروحة" },
      { id: 5, name: "Ouled Moumen", arabicName: "أولاد مومن" }
    ]
  },
  {
    id: 42,
    name: "Tipaza",
    arabicName: "تيبازة",
    communes: [
      { id: 1, name: "Tipaza", arabicName: "تيبازة" },
      { id: 2, name: "Cherchell", arabicName: "شرشال" },
      { id: 3, name: "Hadjout", arabicName: "حجوط" },
      { id: 4, name: "Sidi Amar", arabicName: "سيدي عمار" },
      { id: 5, name: "Gouraya", arabicName: "قوراية" }
    ]
  },
  {
    id: 43,
    name: "Mila",
    arabicName: "ميلة",
    communes: [
      { id: 1, name: "Mila", arabicName: "ميلة" },
      { id: 2, name: "Ferdjioua", arabicName: "فرجيوة" },
      { id: 3, name: "Grarem Gouga", arabicName: "قرارم قوقة" },
      { id: 4, name: "Rouached", arabicName: "رواشد" },
      { id: 5, name: "Tassadane Haddada", arabicName: "تسدان حدادة" }
    ]
  },
  {
    id: 44,
    name: "Ain Defla",
    arabicName: "عين الدفلى",
    communes: [
      { id: 1, name: "Ain Defla", arabicName: "عين الدفلى" },
      { id: 2, name: "Miliana", arabicName: "مليانة" },
      { id: 3, name: "Boumedfaa", arabicName: "بومدفع" },
      { id: 4, name: "Hammam Righa", arabicName: "حمام ريغة" },
      { id: 5, name: "Djelida", arabicName: "جليدة" }
    ]
  },
  {
    id: 45,
    name: "Naama",
    arabicName: "النعامة",
    communes: [
      { id: 1, name: "Naama", arabicName: "النعامة" },
      { id: 2, name: "Mecheria", arabicName: "المشرية" },
      { id: 3, name: "Ain Sefra", arabicName: "عين الصفراء" },
      { id: 4, name: "Tiout", arabicName: "تيوت" },
      { id: 5, name: "Moghrar", arabicName: "مغرار" }
    ]
  },
  {
    id: 46,
    name: "Ain Temouchent",
    arabicName: "عين تموشنت",
    communes: [
      { id: 1, name: "Ain Temouchent", arabicName: "عين تموشنت" },
      { id: 2, name: "Hammam Bou Hadjar", arabicName: "حمام بو حجار" },
      { id: 3, name: "Beni Saf", arabicName: "بني صاف" },
      { id: 4, name: "El Amria", arabicName: "العامرية" },
      { id: 5, name: "Oulhaca El Gheraba", arabicName: "أولهاق الغرابة" }
    ]
  },
  {
    id: 47,
    name: "Ghardaia",
    arabicName: "غرداية",
    communes: [
      { id: 1, name: "Ghardaia", arabicName: "غرداية" },
      { id: 2, name: "El Atteuf", arabicName: "العطف" },
      { id: 3, name: "Bounoura", arabicName: "بونورة" },
      { id: 4, name: "El Guerrara", arabicName: "القرارة" },
      { id: 5, name: "Berriane", arabicName: "بريان" }
    ]
  },
  {
    id: 48,
    name: "Relizane",
    arabicName: "غليزان",
    communes: [
      { id: 1, name: "Relizane", arabicName: "غليزان" },
      { id: 2, name: "Ammi Moussa", arabicName: "عمي موسى" },
      { id: 3, name: "El Matmar", arabicName: "المطمر" },
      { id: 4, name: "Sidi M'hamed Ben Ali", arabicName: "سيدي امحمد بن علي" },
      { id: 5, name: "Zemmora", arabicName: "زمورة" }
    ]
  },
  {
    id: 49,
    name: "El M'Ghair",
    arabicName: "المغير",
    communes: [
      { id: 1, name: "El M'Ghair", arabicName: "المغير" },
      { id: 2, name: "Djamaa", arabicName: "جامعة" },
      { id: 3, name: "El Guerrara", arabicName: "القرارة" },
      { id: 4, name: "Touggourt", arabicName: "تقرت" },
      { id: 5, name: "Zaouia El Abidia", arabicName: "زاوية العابدية" }
    ]
  },
  {
    id: 50,
    name: "El Meniaa",
    arabicName: "المنيعة",
    communes: [
      { id: 1, name: "El Meniaa", arabicName: "المنيعة" },
      { id: 2, name: "Hassi Gara", arabicName: "حاسي قارة" },
      { id: 3, name: "Mansourah", arabicName: "منصورة" },
      { id: 4, name: "Sidi Aissa", arabicName: "سيدي عيسى" },
      { id: 5, name: "Tinerkouk", arabicName: "تينركوك" }
    ]
  },
  {
    id: 51,
    name: "Ouled Djellal",
    arabicName: "أولاد جلال",
    communes: [
      { id: 1, name: "Ouled Djellal", arabicName: "أولاد جلال" },
      { id: 2, name: "Doucen", arabicName: "دوسن" },
      { id: 3, name: "Sidi Khaled", arabicName: "سيدي خالد" },
      { id: 4, name: "Ain El Hadjel", arabicName: "عين الحجل" },
      { id: 5, name: "El Outaya", arabicName: "الوطاية" }
    ]
  },
  {
    id: 52,
    name: "Bordj Badji Mokhtar",
    arabicName: "برج باجي مختار",
    communes: [
      { id: 1, name: "Bordj Badji Mokhtar", arabicName: "برج باجي مختار" },
      { id: 2, name: "Timiaouine", arabicName: "تمياوين" },
      { id: 3, name: "In Guezzam", arabicName: "إن غزام" },
      { id: 4, name: "Tin Zaouatine", arabicName: "تين زاوتين" },
      { id: 5, name: "Zaouiet Kounta", arabicName: "زاوية كنتة" }
    ]
  },
  {
    id: 53,
    name: "Beni Abbes",
    arabicName: "بني عباس",
    communes: [
      { id: 1, name: "Beni Abbes", arabicName: "بني عباس" },
      { id: 2, name: "Igli", arabicName: "إقلي" },
      { id: 3, name: "Kerzaz", arabicName: "كرزاز" },
      { id: 4, name: "Ouled Khodeir", arabicName: "أولاد خضير" },
      { id: 5, name: "Tabelbala", arabicName: "تبلبالة" }
    ]
  },
  {
    id: 54,
    name: "Timimoun",
    arabicName: "تيميمون",
    communes: [
      { id: 1, name: "Timimoun", arabicName: "تيميمون" },
      { id: 2, name: "Aougrout", arabicName: "أوقروت" },
      { id: 3, name: "Charouine", arabicName: "شروين" },
      { id: 4, name: "Ouled Saïd", arabicName: "أولاد سعيد" },
      { id: 5, name: "Metlili", arabicName: "متليلي" }
    ]
  },
  {
    id: 55,
    name: "Touggourt",
    arabicName: "تقرت",
    communes: [
      { id: 1, name: "Touggourt", arabicName: "تقرت" },
      { id: 2, name: "El Hadjira", arabicName: "الحجيرة" },
      { id: 3, name: "El Allia", arabicName: "العالية" },
      { id: 4, name: "El Borma", arabicName: "البرمة" },
      { id: 5, name: "Zaouia El Abidia", arabicName: "زاوية العابدية" }
    ]
  },
  {
    id: 56,
    name: "Djanet",
    arabicName: "جانت",
    communes: [
      { id: 1, name: "Djanet", arabicName: "جانت" },
      { id: 2, name: "Bordj El Haouas", arabicName: "برج الحواس" },
      { id: 3, name: "Debdeb", arabicName: "دبداب" },
      { id: 4, name: "In Amenas", arabicName: "إن أميناس" },
      { id: 5, name: "Illizi", arabicName: "إليزي" }
    ]
  },
  {
    id: 57,
    name: "In Salah",
    arabicName: "إن صالح",
    communes: [
      { id: 1, name: "In Salah", arabicName: "إن صالح" },
      { id: 2, name: "Foggaret Ezzaouia", arabicName: "فجيرة الزاوية" },
      { id: 3, name: "In Guezzam", arabicName: "إن غزام" },
      { id: 4, name: "Tamanrasset", arabicName: "تمنراست" },
      { id: 5, name: "Abalessa", arabicName: "أبلسة" }
    ]
  },
  {
    id: 58,
    name: "In Guezzam",
    arabicName: "إن غزام",
    communes: [
      { id: 1, name: "In Guezzam", arabicName: "إن غزام" },
      { id: 2, name: "Tin Zaouatine", arabicName: "تين زاوتين" },
      { id: 3, name: "Bordj Badji Mokhtar", arabicName: "برج باجي مختار" },
      { id: 4, name: "Timiaouine", arabicName: "تمياوين" },
      { id: 5, name: "Zaouiet Kounta", arabicName: "زاوية كنتة" }
    ]
  }
]

export const deliveryOptions = [
  { id: 'home', name: 'Home Delivery', arabicName: 'التوصيل للمنزل', description: 'Delivered to your home address' },
  { id: 'desktop', name: 'Desktop Delivery', arabicName: 'التوصيل للمكتب', description: 'Delivered to your workplace' }
]

// Shipping prices by wilaya (state) and delivery type
export const shippingPrices: Record<number, { desktop: number; home: number }> = {
  1: { desktop: 800, home: 1200 }, // Adrar
  2: { desktop: 450, home: 800 },  // Chlef
  3: { desktop: 550, home: 900 },  // Laghouat
  4: { desktop: 450, home: 800 },  // Oum El Bouaghi
  5: { desktop: 450, home: 800 },  // Batna
  6: { desktop: 450, home: 800 },  // Béjaïa
  7: { desktop: 450, home: 800 },  // Biskra
  8: { desktop: 550, home: 900 },  // Béchar
  9: { desktop: 300, home: 500 },  // Blida
  10: { desktop: 400, home: 700 }, // Bouira
  11: { desktop: 800, home: 1200 }, // Tamanrasset
  12: { desktop: 450, home: 800 }, // Tébessa
  13: { desktop: 450, home: 800 }, // Tlemcen
  14: { desktop: 450, home: 800 }, // Tiaret
  15: { desktop: 400, home: 700 }, // Tizi Ouzou
  16: { desktop: 200, home: 400 }, // Alger
  17: { desktop: 550, home: 900 }, // Djelfa
  18: { desktop: 450, home: 800 }, // Jijel
  19: { desktop: 450, home: 800 }, // Sétif
  20: { desktop: 450, home: 800 }, // Saïda
  21: { desktop: 450, home: 800 }, // Skikda
  22: { desktop: 450, home: 800 }, // Sidi Bel Abbès
  23: { desktop: 450, home: 800 }, // Annaba
  24: { desktop: 450, home: 800 }, // Guelma
  25: { desktop: 450, home: 800 }, // Constantine
  26: { desktop: 400, home: 700 }, // Médéa
  27: { desktop: 450, home: 800 }, // Mostaganem
  28: { desktop: 450, home: 800 }, // M'Sila
  29: { desktop: 450, home: 800 }, // Mascara
  30: { desktop: 550, home: 900 }, // Ouargla
  31: { desktop: 450, home: 800 }, // Oran
  32: { desktop: 550, home: 900 }, // El Bayadh
  33: { desktop: 800, home: 1200 }, // Illizi
  34: { desktop: 450, home: 800 }, // Bordj Bou Arréridj
  35: { desktop: 400, home: 700 }, // Boumerdès
  36: { desktop: 450, home: 800 }, // El Tarf
  37: { desktop: 800, home: 1200 }, // Tindouf
  38: { desktop: 450, home: 800 }, // Tissemsilt
  39: { desktop: 550, home: 900 }, // El Oued
  40: { desktop: 450, home: 800 }, // Khenchela
  41: { desktop: 450, home: 800 }, // Souk Ahras
  42: { desktop: 350, home: 600 }, // Tipaza
  43: { desktop: 450, home: 800 }, // Mila
  44: { desktop: 450, home: 800 }, // Aïn Defla
  45: { desktop: 550, home: 900 }, // Naâma
  46: { desktop: 450, home: 800 }, // Aïn Témouchent
  47: { desktop: 550, home: 900 }, // Ghardaïa
  48: { desktop: 450, home: 800 }, // Relizane
  49: { desktop: 800, home: 1200 }, // Timimoun
  50: { desktop: 800, home: 1200 }, // Bordj Badji Mokhtar
  51: { desktop: 550, home: 900 }, // Ouled Djellal
  52: { desktop: 800, home: 1200 }, // Béni Abbès
  53: { desktop: 800, home: 1200 }, // In Salah
  54: { desktop: 800, home: 1200 }, // In Guezzam
  55: { desktop: 550, home: 900 }, // Touggourt
  56: { desktop: 800, home: 1200 }, // Djanet
  57: { desktop: 550, home: 900 }, // El M'Ghair
  58: { desktop: 550, home: 900 }  // El Meniaa
}

// Function to get shipping price based on wilaya and delivery type
export const getShippingPrice = (wilayaId: number, deliveryType: 'desktop' | 'home'): number => {
  const prices = shippingPrices[wilayaId]
  if (!prices) {
    // Default price if wilaya not found
    return 800
  }
  return prices[deliveryType]
}

export const getWilayaById = (id: number): Wilaya | undefined => {
  return algeriaWilayas.find(wilaya => wilaya.id === id)
}

export const getCommuneById = (wilayaId: number, communeId: number): Commune | undefined => {
  const wilaya = getWilayaById(wilayaId)
  return wilaya?.communes.find(commune => commune.id === communeId)
}
