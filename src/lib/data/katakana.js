export const katakanaGroups = [
  {
    id: 'katakana-gojuon',
    name: 'Katakana - Basic (50 Sounds)',
    script: 'katakana',
    type: 'basic',
    chars: [
      { kana: 'ア', romaji: ['a'], row: 'a' },
      { kana: 'イ', romaji: ['i'], row: 'a' },
      { kana: 'ウ', romaji: ['u'], row: 'a' },
      { kana: 'エ', romaji: ['e'], row: 'a' },
      { kana: 'オ', romaji: ['o'], row: 'a' },

      { kana: 'カ', romaji: ['ka'], row: 'ka' },
      { kana: 'キ', romaji: ['ki'], row: 'ka' },
      { kana: 'ク', romaji: ['ku'], row: 'ka' },
      { kana: 'ケ', romaji: ['ke'], row: 'ka' },
      { kana: 'コ', romaji: ['ko'], row: 'ka' },

      { kana: 'サ', romaji: ['sa'], row: 'sa' },
      { kana: 'シ', romaji: ['shi', 'si'], row: 'sa' },
      { kana: 'ス', romaji: ['su'], row: 'sa' },
      { kana: 'セ', romaji: ['se'], row: 'sa' },
      { kana: 'ソ', romaji: ['so'], row: 'sa' },

      { kana: 'タ', romaji: ['ta'], row: 'ta' },
      { kana: 'チ', romaji: ['chi', 'ti'], row: 'ta' },
      { kana: 'ツ', romaji: ['tsu', 'tu'], row: 'ta' },
      { kana: 'テ', romaji: ['te'], row: 'ta' },
      { kana: 'ト', romaji: ['to'], row: 'ta' },

      { kana: 'ナ', romaji: ['na'], row: 'na' },
      { kana: 'ニ', romaji: ['ni'], row: 'na' },
      { kana: 'ヌ', romaji: ['nu'], row: 'na' },
      { kana: 'ネ', romaji: ['ne'], row: 'na' },
      { kana: 'ノ', romaji: ['no'], row: 'na' },

      { kana: 'ハ', romaji: ['ha'], row: 'ha' },
      { kana: 'ヒ', romaji: ['hi'], row: 'ha' },
      { kana: 'フ', romaji: ['fu', 'hu'], row: 'ha' },
      { kana: 'ヘ', romaji: ['he'], row: 'ha' },
      { kana: 'ホ', romaji: ['ho'], row: 'ha' },

      { kana: 'マ', romaji: ['ma'], row: 'ma' },
      { kana: 'ミ', romaji: ['mi'], row: 'ma' },
      { kana: 'ム', romaji: ['mu'], row: 'ma' },
      { kana: 'メ', romaji: ['me'], row: 'ma' },
      { kana: 'モ', romaji: ['mo'], row: 'ma' },

      { kana: 'ヤ', romaji: ['ya'], row: 'ya' },
      { kana: 'ユ', romaji: ['yu'], row: 'ya' },
      { kana: 'ヨ', romaji: ['yo'], row: 'ya' },

      { kana: 'ラ', romaji: ['ra'], row: 'ra' },
      { kana: 'リ', romaji: ['ri'], row: 'ra' },
      { kana: 'ル', romaji: ['ru'], row: 'ra' },
      { kana: 'レ', romaji: ['re'], row: 'ra' },
      { kana: 'ロ', romaji: ['ro'], row: 'ra' },

      { kana: 'ワ', romaji: ['wa'], row: 'wa' },
      { kana: 'ヲ', romaji: ['wo', 'o'], row: 'wa' },
      { kana: 'ン', romaji: ['n', 'nn'], row: 'wa' },
    ]
  },
  {
    id: 'katakana-dakuten',
    name: 'Katakana - Voiced (Dakuten)',
    script: 'katakana',
    type: 'dakuten',
    chars: [
      { kana: 'ガ', romaji: ['ga'], row: 'ga' },
      { kana: 'ギ', romaji: ['gi'], row: 'ga' },
      { kana: 'グ', romaji: ['gu'], row: 'ga' },
      { kana: 'ゲ', romaji: ['ge'], row: 'ga' },
      { kana: 'ゴ', romaji: ['go'], row: 'ga' },

      { kana: 'ザ', romaji: ['za'], row: 'za' },
      { kana: 'ジ', romaji: ['ji', 'zi'], row: 'za' },
      { kana: 'ズ', romaji: ['zu'], row: 'za' },
      { kana: 'ゼ', romaji: ['ze'], row: 'za' },
      { kana: 'ゾ', romaji: ['zo'], row: 'za' },

      { kana: 'ダ', romaji: ['da'], row: 'da' },
      { kana: 'ヂ', romaji: ['di', 'ji'], row: 'da' },
      { kana: 'ヅ', romaji: ['du', 'zu'], row: 'da' },
      { kana: 'デ', romaji: ['de'], row: 'da' },
      { kana: 'ド', romaji: ['do'], row: 'da' },

      { kana: 'バ', romaji: ['ba'], row: 'ba' },
      { kana: 'ビ', romaji: ['bi'], row: 'ba' },
      { kana: 'ブ', romaji: ['bu'], row: 'ba' },
      { kana: 'ベ', romaji: ['be'], row: 'ba' },
      { kana: 'ボ', romaji: ['bo'], row: 'ba' },
    ]
  },
  {
    id: 'katakana-handakuten',
    name: 'Katakana - Half-Voiced (Handakuten)',
    script: 'katakana',
    type: 'handakuten',
    chars: [
      { kana: 'パ', romaji: ['pa'], row: 'pa' },
      { kana: 'ピ', romaji: ['pi'], row: 'pa' },
      { kana: 'プ', romaji: ['pu'], row: 'pa' },
      { kana: 'ペ', romaji: ['pe'], row: 'pa' },
      { kana: 'ポ', romaji: ['po'], row: 'pa' },
    ]
  },
  {
    id: 'katakana-yoon',
    name: 'Katakana - Combinations (Yōon)',
    script: 'katakana',
    type: 'yoon',
    chars: [
      { kana: 'キャ', romaji: ['kya'], row: 'kya' },
      { kana: 'キュ', romaji: ['kyu'], row: 'kya' },
      { kana: 'キョ', romaji: ['kyo'], row: 'kya' },

      { kana: 'シャ', romaji: ['sha', 'sya'], row: 'sha' },
      { kana: 'シュ', romaji: ['shu', 'syu'], row: 'sha' },
      { kana: 'ショ', romaji: ['sho', 'syo'], row: 'sha' },

      { kana: 'チャ', romaji: ['cha', 'tya'], row: 'cha' },
      { kana: 'チュ', romaji: ['chu', 'tyu'], row: 'cha' },
      { kana: 'チョ', romaji: ['cho', 'tyo'], row: 'cha' },

      { kana: 'ニャ', romaji: ['nya'], row: 'nya' },
      { kana: 'ニュ', romaji: ['nyu'], row: 'nya' },
      { kana: 'ニョ', romaji: ['nyo'], row: 'nya' },

      { kana: 'ヒャ', romaji: ['hya'], row: 'hya' },
      { kana: 'ヒュ', romaji: ['hyu'], row: 'hya' },
      { kana: 'ヒョ', romaji: ['hyo'], row: 'hya' },

      { kana: 'ミャ', romaji: ['mya'], row: 'mya' },
      { kana: 'ミュ', romaji: ['myu'], row: 'mya' },
      { kana: 'ミョ', romaji: ['myo'], row: 'mya' },

      { kana: 'リャ', romaji: ['rya'], row: 'rya' },
      { kana: 'リュ', romaji: ['ryu'], row: 'rya' },
      { kana: 'リョ', romaji: ['ryo'], row: 'rya' },

      { kana: 'ギャ', romaji: ['gya'], row: 'gya' },
      { kana: 'ギュ', romaji: ['gyu'], row: 'gya' },
      { kana: 'ギョ', romaji: ['gyo'], row: 'gya' },

      { kana: 'ジャ', romaji: ['ja', 'zya', 'jya'], row: 'ja' },
      { kana: 'ジュ', romaji: ['ju', 'zyu', 'jyu'], row: 'ja' },
      { kana: 'ジョ', romaji: ['jo', 'zyo', 'jyo'], row: 'ja' },

      { kana: 'ヂャ', romaji: ['dya', 'ja'], row: 'dya' },
      { kana: 'ヂュ', romaji: ['dyu', 'ju'], row: 'dya' },
      { kana: 'ヂョ', romaji: ['dyo', 'jo'], row: 'dya' },

      { kana: 'ビャ', romaji: ['bya'], row: 'bya' },
      { kana: 'ビュ', romaji: ['byu'], row: 'bya' },
      { kana: 'ビョ', romaji: ['byo'], row: 'bya' },

      { kana: 'ピャ', romaji: ['pya'], row: 'pya' },
      { kana: 'ピュ', romaji: ['pyu'], row: 'pya' },
      { kana: 'ピョ', romaji: ['pyo'], row: 'pya' },
    ]
  },
  {
    id: 'katakana-extended',
    name: 'Katakana - Extended (Foreign Sounds)',
    script: 'katakana',
    type: 'extended',
    chars: [
      // V-series
      { kana: 'ヴァ', romaji: ['va'], row: 'v' },
      { kana: 'ヴィ', romaji: ['vi'], row: 'v' },
      { kana: 'ヴ', romaji: ['vu'], row: 'v' },
      { kana: 'ヴェ', romaji: ['ve'], row: 'v' },
      { kana: 'ヴォ', romaji: ['vo'], row: 'v' },
      { kana: 'ヴュ', romaji: ['vyu'], row: 'v' },

      // F-series
      { kana: 'ファ', romaji: ['fa'], row: 'f' },
      { kana: 'フィ', romaji: ['fi'], row: 'f' },
      { kana: 'フェ', romaji: ['fe'], row: 'f' },
      { kana: 'フォ', romaji: ['fo'], row: 'f' },
      { kana: 'フュ', romaji: ['fyu'], row: 'f' },

      // W-extended
      { kana: 'ウィ', romaji: ['wi'], row: 'w_ext' },
      { kana: 'ウェ', romaji: ['we'], row: 'w_ext' },
      { kana: 'ウォ', romaji: ['wo'], row: 'w_ext' },

      // T-extended
      { kana: 'ティ', romaji: ['ti', 'thi'], row: 't_ext' },
      { kana: 'トゥ', romaji: ['tu', 'twu'], row: 't_ext' },
      { kana: 'テュ', romaji: ['tyu'], row: 't_ext' },

      // D-extended
      { kana: 'ディ', romaji: ['di'], row: 'd_ext' },
      { kana: 'ドゥ', romaji: ['du'], row: 'd_ext' },
      { kana: 'デュ', romaji: ['dyu'], row: 'd_ext' },

      // Sh/Ch/J-extended
      { kana: 'シェ', romaji: ['she'], row: 'sh_ext' },
      { kana: 'チェ', romaji: ['che'], row: 'ch_ext' },
      { kana: 'ジェ', romaji: ['je'], row: 'j_ext' },

      // Ts-extended
      { kana: 'ツァ', romaji: ['tsa'], row: 'ts_ext' },
      { kana: 'ツィ', romaji: ['tsi'], row: 'ts_ext' },
      { kana: 'ツェ', romaji: ['tse'], row: 'ts_ext' },
      { kana: 'ツォ', romaji: ['tso'], row: 'ts_ext' },

      // Kw/Gw
      { kana: 'クァ', romaji: ['kwa'], row: 'kw_ext' },
      { kana: 'クィ', romaji: ['kwi'], row: 'kw_ext' },
      { kana: 'クェ', romaji: ['kwe'], row: 'kw_ext' },
      { kana: 'クォ', romaji: ['kwo'], row: 'kw_ext' },
      { kana: 'グァ', romaji: ['gwa'], row: 'gw_ext' },

      // Other
      { kana: 'イェ', romaji: ['ye'], row: 'other_ext' },
      { kana: 'スィ', romaji: ['si'], row: 'other_ext' },
      { kana: 'ズィ', romaji: ['zi'], row: 'other_ext' },
      { kana: 'ホゥ', romaji: ['hu'], row: 'other_ext' },
    ]
  }
];
