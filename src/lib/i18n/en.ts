import type { Translations } from "./types";

export const en: Translations = {
  // common
  "common.appName": "CafeNavi",
  "common.tagline": "Find your perfect coffee match",
  "common.start": "Start",
  "common.back": "Back",
  "common.next": "Next",
  "common.submit": "Get Results",
  "common.home": "Home",

  // nav
  "nav.home": "Home",
  "nav.questionnaire": "Questionnaire",
  "nav.guide": "Guide",
  "nav.history": "History",

  // home
  "home.beginnerMode": "Quick Diagnosis",
  "home.beginnerDesc":
    "Recommended for beginners. We'll analyze your taste preferences with 10 questions.",
  "home.beginnerButton": "10 Questions",
  "home.beginnerAria": "Start quick diagnosis",
  "home.advancedMode": "Detailed Diagnosis",
  "home.advancedDesc":
    "For enthusiasts. Get a more precise result with 20 detailed questions.",
  "home.advancedButton": "20 Questions",
  "home.advancedAria": "Start detailed diagnosis",
  "home.guideLink": "View Coffee Guide",

  // questionnaire
  "questionnaire.beginnerLabel": "Quick Diagnosis",
  "questionnaire.advancedLabel": "Detailed Diagnosis",

  // questionnaire slider labels
  "slider.bitternessPreference.left": "Dislike bitterness",
  "slider.bitternessPreference.right": "Love bitterness",
  "slider.acidityPreference.left": "Dislike acidity",
  "slider.acidityPreference.right": "Love acidity",
  "slider.sweetnessPreference.left": "Less sweet",
  "slider.sweetnessPreference.right": "Love sweetness",
  "slider.bodyPreference.left": "Light body",
  "slider.bodyPreference.right": "Full body",
  "slider.fruityPreference.left": "Less fruity",
  "slider.fruityPreference.right": "Love fruity",
  "slider.milkPreference.left": "Black coffee",
  "slider.milkPreference.right": "Lots of milk",
  "slider.roastedPreference.left": "Less roasty",
  "slider.roastedPreference.right": "Love roasty",
  "slider.floralPreference.left": "Less floral",
  "slider.floralPreference.right": "Love floral",
  "slider.nuttyPreference.left": "Less nutty",
  "slider.nuttyPreference.right": "Love nutty",
  "slider.chocolatePreference.left": "Less chocolaty",
  "slider.chocolatePreference.right": "Love chocolaty",

  // questions
  "question.q-bitterness": "How much do you like bitterness?",
  "question.q-bitterness.beginner":
    "How much do you enjoy the bitterness of coffee (like black coffee)?",
  "question.q-acidity": "How much do you like acidity?",
  "question.q-acidity.beginner":
    "How much do you enjoy the acidity of coffee (fruity, refreshing taste)?",
  "question.q-sweetness": "How much do you like sweetness?",
  "question.q-sweetness.beginner":
    "How much do you enjoy the sweetness of coffee (honey or caramel-like)?",
  "question.q-body": "How much do you like body (mouthfeel)?",
  "question.q-body.beginner":
    "How rich do you like your coffee (light to full-bodied)?",
  "question.q-fruity": "How much do you like fruity flavors?",
  "question.q-fruity.beginner":
    "How much do you enjoy fruity tastes (berry, citrus aroma)?",
  "question.q-milk": "Do you often add milk to your coffee?",
  "question.q-milk.beginner": "Do you like adding milk to your coffee?",
  "question.q-dessert":
    "Select your favorite dessert categories (multiple OK)",
  "question.q-dessert.beginner":
    "Select your favorite sweets. We'll use this for pairing suggestions (multiple OK)",
  "question.q-dessert2":
    "Any other dessert categories you like? (multiple OK)",
  "question.q-dessert2.beginner":
    "Any others? (multiple OK, skip if none)",
  "question.q-scene":
    "When do you usually drink coffee? (multiple OK)",
  "question.q-scene.beginner":
    "When do you want to drink coffee? (multiple OK)",
  "question.q-scene2":
    "Any other occasions? (multiple OK)",
  "question.q-scene2.beginner":
    "Any others? (multiple OK, skip if none)",
  "question.q-roasted": "How much do you like roasted flavors?",
  "question.q-roasted.beginner":
    "How much do you enjoy toasty, roasted aromas?",
  "question.q-floral": "How much do you like floral aromas?",
  "question.q-floral.beginner":
    "How much do you enjoy floral scents (like jasmine)?",
  "question.q-nutty": "How much do you like nutty flavors?",
  "question.q-nutty.beginner":
    "How much do you enjoy nutty aromas (almond, walnut)?",
  "question.q-chocolate": "How much do you like chocolate flavors?",
  "question.q-chocolate.beginner":
    "How much do you enjoy chocolate-like flavors (cocoa aroma)?",
  "question.q-bitterness-detail":
    "Bitterness quality: Do you prefer sharp or mellow bitterness?",
  "question.q-bitterness-detail.beginner":
    "Type of bitterness: Do you prefer crisp or smooth bitterness?",
  "question.q-acidity-detail":
    "Acidity quality: Do you prefer bright citrus or mellow berry acidity?",
  "question.q-acidity-detail.beginner":
    "Type of acidity: Do you prefer lemony brightness or strawberry-like gentleness?",
  "question.q-sweetness-detail":
    "Sweetness quality: Do you prefer fruit-derived or caramel-derived sweetness?",
  "question.q-sweetness-detail.beginner":
    "Type of sweetness: Do you prefer fruit sweetness or caramel sweetness?",
  "question.q-body-detail":
    "Body quality: Do you prefer silky or creamy texture?",
  "question.q-body-detail.beginner":
    "Type of mouthfeel: Do you prefer smooth or creamy texture?",
  "question.q-cleanness":
    "How much do you value a clean cup (absence of off-flavors)?",
  "question.q-cleanness.beginner":
    "How much do you value a clean aftertaste (easy-drinking, no off-notes)?",
  "question.q-complexity":
    "How much do you value complexity (layered flavors)?",
  "question.q-complexity.beginner":
    "How much do you value depth of flavor (multiple overlapping tastes)?",

  // question options
  "option.chocolate": "Chocolate",
  "option.chocolate.beginner": "Chocolate",
  "option.nuts": "Nuts",
  "option.nuts.beginner": "Nuts & Almonds",
  "option.caramel": "Caramel",
  "option.caramel.beginner": "Caramel & Pudding",
  "option.citrusFruits": "Citrus Fruits",
  "option.citrusFruits.beginner": "Lemon & Orange sweets",
  "option.berries": "Berries",
  "option.berries.beginner": "Strawberry & Blueberry",
  "option.wagashi": "Japanese sweets",
  "option.wagashi.beginner": "Japanese sweets (mochi, yokan)",
  "option.butterPastry": "Butter pastries",
  "option.butterPastry.beginner": "Cookies & Madeleines",
  "option.spicedSweets": "Spiced sweets",
  "option.spicedSweets.beginner": "Cinnamon rolls & Ginger cookies",
  "option.cheese": "Cheese",
  "option.cheese.beginner": "Cheesecake & Cheese",
  "option.driedFruits": "Dried fruits",
  "option.driedFruits.beginner": "Raisins & Dried mango",
  "option.morningRefresh": "Morning refresh",
  "option.morningRefresh.beginner": "When I need to wake up in the morning",
  "option.workFocus": "Focus time at work",
  "option.workFocus.beginner": "When focusing on work or study",
  "option.afterMeal": "After a meal",
  "option.afterMeal.beginner": "Relaxing after a meal",
  "option.withDessert": "With dessert",
  "option.withDessert.beginner": "Snack time",
  "option.relax": "Relaxation",
  "option.relax.beginner": "When relaxing and unwinding",
  "option.strongWithMilk": "Strong with milk",
  "option.strongWithMilk.beginner": "As a latte or cafe au lait",

  // result
  "result.title": "Your Results",
  "result.subtitle": "We found the perfect coffee for you",
  "result.saved": "Saved to history",
  "result.fromHistory": "Saved diagnosis result",
  "result.sectionRecommended": "Recommended Coffee",
  "result.sectionFlavorProfile": "Flavor Profile",
  "result.sectionBrewing": "Recommended Settings",
  "result.sectionPairing": "Perfect Pairings",
  "result.sectionAvoid": "What to Avoid",
  "result.matchScore": "Match",
  "result.you": "You",
  "result.retryDiagnosis": "Try Again",
  "result.viewGuide": "View Coffee Guide",
  "result.viewHistory": "View History",
  "result.radarChartAria": "Flavor profile radar chart",

  // brewing recommendation
  "brewing.title": "Recommended Settings",
  "brewing.roastLevel": "Roast Level",
  "brewing.grindSize": "Grind Size",
  "brewing.brewingMethod": "Brewing Method",
  "brewing.lightRoast": "Light",
  "brewing.darkRoast": "Dark",

  // pairing
  "pairing.title": "Perfect Pairings",

  // flavor labels
  "flavor.bitterness": "Bitterness",
  "flavor.acidity": "Acidity",
  "flavor.sweetness": "Sweetness",
  "flavor.body": "Body",
  "flavor.fruitiness": "Fruity",
  "flavor.floral": "Floral",
  "flavor.nuttiness": "Nutty",
  "flavor.chocolaty": "Chocolaty",
  "flavor.roastiness": "Roasty",
  "flavor.cleanness": "Clean",

  // roast levels
  "roastLevel.light": "Light Roast",
  "roastLevel.medium-light": "Medium-Light Roast",
  "roastLevel.medium": "Medium Roast",
  "roastLevel.medium-dark": "Medium-Dark Roast",
  "roastLevel.dark": "Dark Roast",

  // grind sizes
  "grindSize.extra-fine": "Extra Fine",
  "grindSize.fine": "Fine",
  "grindSize.medium-fine": "Medium-Fine",
  "grindSize.medium": "Medium",
  "grindSize.coarse": "Coarse",

  // brewing methods
  "brewingMethod.handDrip": "Pour Over",
  "brewingMethod.espresso": "Espresso",
  "brewingMethod.frenchPress": "French Press",
  "brewingMethod.coldBrew": "Cold Brew",

  // guide page
  "guide.title": "Coffee Guide",
  "guide.subtitle": "Essential knowledge for enjoying coffee",
  "guide.origins": "Coffee Origins",
  "guide.roasting": "Roast Levels",
  "guide.grinding": "Grind Sizes",
  "guide.brewing": "Brewing Methods",

  // guide roast descriptions
  "guide.roastDesc.light":
    "Bright acidity with fruity and floral flavors. The roast level that best showcases the bean's natural character.",
  "guide.roastDesc.medium-light":
    "Good balance of acidity and sweetness, retaining fruit and floral notes with added smoothness.",
  "guide.roastDesc.medium":
    "Well-balanced acidity, sweetness, and bitterness. Nutty and chocolaty notes start to emerge.",
  "guide.roastDesc.medium-dark":
    "Increased bitterness and body with stronger chocolate and caramel notes. Reduced acidity.",
  "guide.roastDesc.dark":
    "Strong bitterness with full body. Smoky aroma and dark chocolate notes. Excellent with milk.",

  // guide grind descriptions
  "guide.grindDesc.extra-fine":
    "Powder-like consistency. For Turkish coffee and other specialty methods.",
  "guide.grindDesc.fine": "Sugar-like consistency. Ideal for espresso.",
  "guide.grindDesc.medium-fine":
    "Granulated sugar consistency. Ideal for pour-over with paper filter.",
  "guide.grindDesc.medium":
    "Coarse sand consistency. Suitable for siphon and cloth drip.",
  "guide.grindDesc.coarse":
    "Coarse particles. Suitable for French press and cold brew. For longer extraction methods.",

  // guide brewing descriptions
  "guide.brewingDesc.handDrip":
    "Manual pour through paper filter. Produces clean, delicate flavors. The charm is controlling taste through pour technique.",
  "guide.brewingDesc.espresso":
    "High-pressure, short extraction. Rich and intense flavor. Also serves as a base for lattes and cappuccinos.",
  "guide.brewingDesc.frenchPress":
    "Metal filter extraction. Retains coffee oils for a rich, full-bodied taste. Easy to brew at home.",
  "guide.brewingDesc.coldBrew":
    "Slow extraction with cold water (8-24 hours). Smooth, sweet, and low in bitterness.",

  // history
  "history.title": "Diagnosis History",
  "history.subtitle": "Review your past diagnosis results",
  "history.empty": "No diagnosis history yet",
  "history.emptyDesc": "Your results will be saved here after taking a diagnosis",
  "history.startDiagnosis": "Start Diagnosis",
  "history.deleteAll": "Delete All History",
  "history.delete": "Delete",
  "history.confirmDelete": "Delete this diagnosis record?",
  "history.confirmDeleteAll":
    "Delete all diagnosis history? This action cannot be undone.",
  "history.backHome": "Back to Home",
  "history.beginner": "Quick",
  "history.advanced": "Detailed",
  "history.matchScore": "Match: {{score}}%",

  // footer
  "footer.copyright": "\u00a9 {{year}} CafeNavi. All rights reserved.",

  // locale toggle
  "locale.switchTo": "日本語に切替",

  // coffee profile descriptions
  "coffee.ethiopia-yirgacheffe.description":
    "One of the world's most elegant coffees, grown in the Yirgacheffe region of southern Ethiopia. Characterized by jasmine and bergamot-like floral aromas and blueberry-like fruity flavors. Light roasting brings out its delicate complexity.",
  "coffee.kenya-aa.description":
    "Kenya's highest grade AA classification. Striking acidity reminiscent of blackcurrant and grapefruit, with juicy berry-like sweetness. Full-bodied with a long finish.",
  "coffee.guatemala-antigua.description":
    "From Guatemala's renowned Antigua region. Volcanic soil produces rich chocolate and nutty flavors. Well-balanced acidity, sweetness, and body, versatile across many brewing methods at medium roast.",
  "coffee.colombia-huila.description":
    "Colombia's southern Huila region is renowned for high-quality specialty coffee. Harmonious caramel sweetness and nutty flavors with a clean, approachable taste. A great first specialty coffee.",
  "coffee.brazil-santos.description":
    "The signature bean from the world's largest coffee-producing country. Rich nutty and chocolate flavors with mild acidity, making it universally appealing. Consistently delicious across all brewing methods.",
  "coffee.indonesia-mandheling.description":
    "A full-bodied coffee from northern Sumatra. Characterized by its heavy body, spicy aroma, and distinctive earthy flavor. Dark roasting accentuates its personality, and it pairs wonderfully with milk.",
  "coffee.costarica-tarrazu.description":
    "From Costa Rica's prestigious Tarrazu region. Known for its exceptionally clean cup, with honey-like sweetness and elegant acidity in harmony. A refreshing cup perfect for mornings.",
  "coffee.yemen-mocha.description":
    "A traditional mocha from Yemen, considered the birthplace of coffee. Complex wine-like fruitiness coexists with spice notes in this uniquely characterful coffee. Natural processing adds depth of flavor.",
  "coffee.tanzania-kilimanjaro.description":
    "Tanzania's signature bean, grown at high altitude on the slopes of Mt. Kilimanjaro. Bright citrus acidity with a clean finish. Elegant, tea-like quality makes it light and enjoyable.",
  "coffee.panama-geisha.description":
    "The world's most prestigious coffee variety. Overwhelming jasmine and rose-like floral aromas with tropical fruit sweetness. Best enjoyed as a light roast, hand-dripped to preserve its delicate flavors.",
  "coffee.hawaii-kona.description":
    "A rare coffee grown in volcanic soil on Hawaii's Kona coast. Mellow mouthfeel with nutty flavors and refined sweetness. Clean with minimal off-notes, making it approachable for everyone.",
  "coffee.jamaica-blue-mountain.description":
    "One of the world's three great coffees, grown in Jamaica's Blue Mountains. Praised as the pinnacle of balance, with acidity, sweetness, bitterness, and body in perfect harmony. Silky smooth with a clean finish.",
  "coffee.nicaragua.description":
    "Coffee from the volcanic regions of Central America's Nicaragua. Characterized by caramel and chocolate sweetness with a medium body. A reliable cup that also works well as espresso.",
  "coffee.honduras.description":
    "From Honduras, a major Central American coffee-producing region. Caramel sweetness and fruity acidity in balanced harmony, with a clean and approachable taste. Versatile across many brewing methods.",
  "coffee.el-salvador.description":
    "Coffee grown at high altitude in Central America's El Salvador. Features chocolate and honey-like sweetness with a creamy mouthfeel. Its gentle, soothing character is perfect for after-meal relaxation.",
  "coffee.mexico.description":
    "Coffee from the mountainous regions of southern Mexico. Mild nutty and chocolate flavors with a light body. Low in complexity, making it an accessible everyday coffee.",
  "coffee.peru.description":
    "Coffee from Peru's Andes mountains. Floral aromas with citrus brightness and milk chocolate sweetness in harmony. A delicate and refined cup to savor.",
  "coffee.bolivia.description":
    "A rare coffee produced in small quantities at high altitude in Bolivia. Complex interplay of fruity and floral notes creates a delicate, layered experience. Light roasting reveals its full character.",
  "coffee.rwanda.description":
    "Coffee from the highlands of Rwanda, 'the land of a thousand hills.' Vibrant berry-like juiciness and floral aromas create a bright, lively cup. Classic African coffee vibrancy at its best.",
  "coffee.burundi.description":
    "Coffee from the highlands of East Africa's Burundi. Berry fruitiness, citrus brightness, and tea-like elegance define this light, refreshing cup.",
  "coffee.india-malabar.description":
    "A coffee uniquely processed by monsoon winds on India's Malabar coast. Spicy, full-bodied, and low in acidity. Its distinctive character is often featured in espresso blends.",
  "coffee.myanmar.description":
    "An emerging origin from Myanmar's Shan Plateau in Southeast Asia. Nutty and chocolate flavors accented with honey-like sweetness. A gentle cup from a rapidly growing coffee region.",
  "coffee.china-yunnan.description":
    "A specialty coffee from the highlands of China's Yunnan province. Fruity and floral with a delicate tea-like quality reminiscent of Chinese teas. Quality has been improving rapidly in recent years.",
  "coffee.papua-new-guinea.description":
    "Coffee grown amid the rich natural environment of Papua New Guinea. Wild tropical fruit and spice flavors create a distinctively untamed character. Bold body with complex, adventurous taste.",
  "coffee.east-timor.description":
    "Organically grown coffee from the small Southeast Asian nation of East Timor. Chocolate depth with earthy undertones and herbal accents. Medium-dark roasting brings out its best qualities.",

  // coffee names (en)
  "coffee.ethiopia-yirgacheffe.name": "Ethiopia Yirgacheffe",
  "coffee.kenya-aa.name": "Kenya AA",
  "coffee.guatemala-antigua.name": "Guatemala Antigua",
  "coffee.colombia-huila.name": "Colombia Huila",
  "coffee.brazil-santos.name": "Brazil Santos",
  "coffee.indonesia-mandheling.name": "Indonesia Mandheling",
  "coffee.costarica-tarrazu.name": "Costa Rica Tarrazu",
  "coffee.yemen-mocha.name": "Yemen Mocha",
  "coffee.tanzania-kilimanjaro.name": "Tanzania Kilimanjaro",
  "coffee.panama-geisha.name": "Panama Geisha",
  "coffee.hawaii-kona.name": "Hawaii Kona",
  "coffee.jamaica-blue-mountain.name": "Jamaica Blue Mountain",
  "coffee.nicaragua.name": "Nicaragua",
  "coffee.honduras.name": "Honduras",
  "coffee.el-salvador.name": "El Salvador",
  "coffee.mexico.name": "Mexico",
  "coffee.peru.name": "Peru",
  "coffee.bolivia.name": "Bolivia",
  "coffee.rwanda.name": "Rwanda",
  "coffee.burundi.name": "Burundi",
  "coffee.india-malabar.name": "India Malabar",
  "coffee.myanmar.name": "Myanmar",
  "coffee.china-yunnan.name": "China Yunnan",
  "coffee.papua-new-guinea.name": "Papua New Guinea",
  "coffee.east-timor.name": "East Timor",

  // coffee notes
  "note.ジャスミン": "Jasmine",
  "note.ベルガモット": "Bergamot",
  "note.ブルーベリー": "Blueberry",
  "note.レモン": "Lemon",
  "note.ピーチ": "Peach",
  "note.カシス": "Blackcurrant",
  "note.グレープフルーツ": "Grapefruit",
  "note.トマト": "Tomato",
  "note.ブラックベリー": "Blackberry",
  "note.赤ワイン": "Red Wine",
  "note.ミルクチョコレート": "Milk Chocolate",
  "note.アーモンド": "Almond",
  "note.キャラメル": "Caramel",
  "note.オレンジピール": "Orange Peel",
  "note.スパイス": "Spice",
  "note.ヘーゼルナッツ": "Hazelnut",
  "note.赤リンゴ": "Red Apple",
  "note.ブラウンシュガー": "Brown Sugar",
  "note.ミルクチョコ": "Milk Chocolate",
  "note.ピーナッツ": "Peanut",
  "note.ダークチョコレート": "Dark Chocolate",
  "note.トースト": "Toast",
  "note.ほのかなスパイス": "Subtle Spice",
  "note.ダークチョコ": "Dark Chocolate",
  "note.ハーブ": "Herbs",
  "note.アーシー": "Earthy",
  "note.シダーウッド": "Cedarwood",
  "note.ハニー": "Honey",
  "note.青リンゴ": "Green Apple",
  "note.バニラ": "Vanilla",
  "note.クリーン": "Clean",
  "note.ドライフルーツ": "Dried Fruit",
  "note.シナモン": "Cinnamon",
  "note.カカオ": "Cacao",
  "note.レーズン": "Raisin",
  "note.オレンジ": "Orange",
  "note.レモングラス": "Lemongrass",
  "note.紅茶": "Black Tea",
  "note.白桃": "White Peach",
  "note.はちみつ": "Honey",
  "note.ローズ": "Rose",
  "note.マンゴー": "Mango",
  "note.ライチ": "Lychee",
  "note.アールグレイ": "Earl Grey",
  "note.マカダミアナッツ": "Macadamia Nut",
  "note.バター": "Butter",
  "note.ほのかなシトラス": "Subtle Citrus",
  "note.フローラル": "Floral",
  "note.ナッツ": "Nuts",
  "note.クリーミー": "Creamy",
  "note.スイートシトラス": "Sweet Citrus",
  "note.ほのかなベリー": "Subtle Berry",
  "note.ベリー": "Berry",
  "note.マスカット": "Muscat",
  "note.ラズベリー": "Raspberry",
  "note.ジューシー": "Juicy",
  "note.タバコ": "Tobacco",
  "note.モルト": "Malt",
  "note.軽やかなシトラス": "Light Citrus",
  "note.プラム": "Plum",
  "note.ジャスミン茶": "Jasmine Tea",
  "note.トロピカルフルーツ": "Tropical Fruit",
  "note.ワイルドベリー": "Wild Berry",

  // pairing items
  "pairing.レモンタルト": "Lemon Tart",
  "pairing.マカロン": "Macaron",
  "pairing.フルーツゼリー": "Fruit Jelly",
  "pairing.ベリーのパンナコッタ": "Berry Panna Cotta",
  "pairing.ベリータルト": "Berry Tart",
  "pairing.チーズケーキ": "Cheesecake",
  "pairing.マドレーヌ": "Madeleine",
  "pairing.フルーツケーキ": "Fruit Cake",
  "pairing.チョコレートケーキ": "Chocolate Cake",
  "pairing.アーモンドクッキー": "Almond Cookie",
  "pairing.カヌレ": "Canelé",
  "pairing.くるみのタルト": "Walnut Tart",
  "pairing.キャラメルプリン": "Caramel Pudding",
  "pairing.ナッツブラウニー": "Nut Brownie",
  "pairing.バナナケーキ": "Banana Cake",
  "pairing.どら焼き": "Dorayaki",
  "pairing.チョコレート": "Chocolate",
  "pairing.ナッツクッキー": "Nut Cookie",
  "pairing.カステラ": "Castella",
  "pairing.シュークリーム": "Cream Puff",
  "pairing.ガトーショコラ": "Gateau Chocolat",
  "pairing.羊羹": "Yokan",
  "pairing.チーズ": "Cheese",
  "pairing.ビターチョコレート": "Dark Chocolate",
  "pairing.フルーツタルト": "Fruit Tart",
  "pairing.バニラアイス": "Vanilla Ice Cream",
  "pairing.スコーン": "Scone",
  "pairing.パウンドケーキ": "Pound Cake",
  "pairing.ドライフルーツ": "Dried Fruit",
  "pairing.スパイスクッキー": "Spice Cookie",
  "pairing.赤ワインチョコ": "Red Wine Chocolate",
  "pairing.デーツ": "Dates",
  "pairing.レモンケーキ": "Lemon Cake",
  "pairing.柑橘系ゼリー": "Citrus Jelly",
  "pairing.クレープ": "Crêpe",
  "pairing.ヨーグルトパフェ": "Yogurt Parfait",
  "pairing.ローズゼリー": "Rose Jelly",
  "pairing.白桃のコンポート": "White Peach Compote",
  "pairing.上生菓子": "Namagashi",
  "pairing.ブラウニー": "Brownie",
  "pairing.おはぎ": "Ohagi",
  "pairing.ティラミス": "Tiramisu",
  "pairing.くるみ餅": "Walnut Mochi",
  "pairing.マカダミアナッツクッキー": "Macadamia Nut Cookie",
  "pairing.フィナンシェ": "Financier",

  // recommendation reasons
  "reason.bitterMatch":
    "{{name}} is recommended for you since you enjoy strong bitterness",
  "reason.bitterLow": "A mild, easy-drinking coffee that matches your preference for less bitterness",
  "reason.acidityHigh": "Enjoy bright, fruit-like acidity",
  "reason.acidityLow": "Low acidity for easy drinking",
  "reason.fruityMatch": "Fruity flavors that match your preferences",
  "reason.chocoMatch":
    "Since you love chocolate sweets, {{name}} with its chocolate notes is a great match",
  "reason.nutMatch":
    "Since you love nutty sweets, {{name}} with its nutty flavor is a perfect pair",
  "reason.fruitDessertMatch":
    "Since you enjoy fruit-based sweets, you'll love the fruity flavors",
  "reason.wagashiMatch":
    "Since you enjoy Japanese sweets, the clean flavor profile pairs well",
  "reason.morningScene":
    "A clean-tasting coffee that's perfect for your morning routine",
  "reason.workScene":
    "Full body to keep you going during work focus time",
  "reason.relaxScene":
    "Sweet, gentle flavors perfect for relaxation time",
  "reason.milkMatch":
    "Full body that holds up well with milk",
  "reason.floralMatch": "Enjoy elegant floral aromas",
  "reason.fallback": "A great match for your flavor profile",

  // avoid notes
  "avoid.deepRoast":
    "Dark roasts with strong bitterness may not suit you. We recommend light to medium roasts",
  "avoid.lightRoastAfrica":
    "Highly acidic light-roast African coffees may not be to your liking",
  "avoid.heavyBody":
    "Heavy-bodied coffees (like Mandheling) may feel too intense",
  "avoid.fruityFloral":
    "Bright, fruity light roasts may not match your preferences",
  "avoid.strongRoast":
    "Heavily roasted dark coffees are best avoided",

  // compare
  "compare.title": "Compare Results",
  "compare.selectTwo": "Select 2 diagnosis results",
  "compare.compare": "Compare",
  "compare.reselect": "Reselect",
  "compare.diagnosis1": "Diagnosis 1",
  "compare.diagnosis2": "Diagnosis 2",
  "compare.noHistory": "Need at least 2 diagnoses to compare",
  "compare.differences": "Differences",
  "compare.same": "Same",
  "compare.date": "Date",
  "compare.mode": "Mode",
  "compare.topCoffee": "Top Recommendation",
  "compare.matchScore": "Match Score",
  "compare.flavorProfile": "Flavor Profile",
  "compare.roastLevel": "Recommended Roast",
  "compare.grindSize": "Recommended Grind",
  "compare.brewingMethod": "Brewing Method",
  "compare.pairings": "Pairings",
  "compare.selected": "{{count}} selected",
  "compare.backHome": "Back to Home",
  "compare.flavorScores": "Flavor Score Details",
  "compare.axis": "Axis",
  "compare.change": "Change",
  "compare.increase": "↑",
  "compare.decrease": "↓",
  "compare.noChange": "→",
  "compare.significantChange": "Significant change",
  "history.selectMode": "Select diagnoses to compare",
  "history.cancelSelect": "Cancel selection",
  "history.selectedCount": "{{count}} selected",
  "history.compareSelected": "Compare selected 2",
  "nav.compare": "Compare",
  "history.compare": "Compare",

  // brewing guide
  "brewingGuide.title": "Brewing Guide",
  "brewingGuide.subtitle": "Master the perfect brew for each roast level",
  "brewingGuide.temperature": "Temperature",
  "brewingGuide.ratio": "Coffee to Water Ratio",
  "brewingGuide.totalTime": "Total Time",
  "brewingGuide.steps": "Steps",
  "brewingGuide.tips": "Tips",
  "brewingGuide.watchVideo": "Watch on YouTube",
  "brewingGuide.filterAll": "All",
  "brewingGuide.noGuides": "No guides available for this roast level yet",
  "result.viewBrewingGuide": "See brewing guide for this roast",

  // nav stats
  "nav.stats": "Stats",

  // stats
  "stats.title": "Diagnosis Stats",
  "stats.subtitle": "Visualize your diagnosis trends",
  "stats.empty": "No diagnosis data yet",
  "stats.emptyDesc": "Take a diagnosis to get started!",
  "stats.startDiagnosis": "Start Diagnosis",
  "stats.backHome": "Back to Home",
  "stats.totalDiagnoses": "Total Diagnoses",
  "stats.topCoffee": "Most Recommended",
  "stats.favoriteRoast": "Preferred Roast",
  "stats.averageProfile": "Average Flavor Profile",
  "stats.topCoffees": "Top Recommended Coffees",
  "stats.roastDistribution": "Roast Level Distribution",
  "stats.brewingDistribution": "Brewing Method Distribution",
  "stats.flavorTrend": "Flavor Trend",
  "stats.viewHistory": "View History",
  "stats.tasteType": "Your Taste Type",
  "stats.tasteTypeDistribution": "Taste Type Distribution",

  // taste type
  "tasteType.title": "Your Taste Type",
  "tasteType.secondary": "Secondary Type",
  "tasteType.fruity": "Fruity Type",
  "tasteType.bitter": "Bitter Type",
  "tasteType.choco-nut": "Choco & Nut Type",
  "tasteType.floral": "Floral Type",
  "tasteType.heavy-body": "Heavy Body Type",
  "tasteType.sweet": "Sweet Type",
  "tasteType.balance": "Balanced Type",
  "tasteType.clean": "Clean Type",
  "tasteType.fruity.desc": "You enjoy refreshing, fruit-like flavors",
  "tasteType.bitter.desc": "You love deep bitterness and rich body",
  "tasteType.choco-nut.desc": "You love chocolate and nutty flavors",
  "tasteType.floral.desc": "You enjoy delicate floral aromas",
  "tasteType.heavy-body.desc": "You seek a full, heavy-bodied cup",
  "tasteType.sweet.desc": "You prefer sweet, mellow coffees",
  "tasteType.balance.desc": "You enjoy well-balanced, versatile coffees",
  "tasteType.clean.desc": "You prefer clean, clear flavors with no off-notes",

  // seasonal
  "seasonal.title": "Seasonal Picks",
  "seasonal.recommendedCoffees": "Recommended Coffees",
  "seasonal.brewingMethods": "Recommended Brewing Methods",
  "seasonal.pairings": "Seasonal Pairings",
  "seasonal.moreLink": "Explore more coffees for this season",

  // serendipity (adventure slot)
  "result.serendipityLabel": "\uD83C\uDFB2 Try Something Different",

  // cold start
  "coldStart.title": "Popular for Beginners",
  "coldStart.description": "Well-balanced coffees that are easy to enjoy, even for coffee beginners.",
  "coldStart.fallbackReason": "A well-balanced coffee recommended for beginners",

  // seasonal bonus reason
  "reason.seasonalBonus": "A perfect pick for this season",

  // A/B test strategy
  "strategy.label": "Recommendation Engine",
  "strategy.v1": "v1 (Legacy)",
  "strategy.v2": "v2 (New)",

  // feedback
  "feedback.surveyButton": "📝 Take a Survey",
  "feedback.surveyNote": "Takes 1-2 minutes",

  // date format
  "date.format": "{{m}}/{{d}}/{{y}} {{h}}:{{min}}",
};
