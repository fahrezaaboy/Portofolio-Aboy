export const profile = {
  name: 'Fahreza Aboy Firansyah',
  role: 'Web Developer Muda',
  school: 'SMK Wikrama Bogor',
  major: 'Rekayasa Perangkat Lunak (RPL)',
  grade: 'Kelas XI',
  bio: [
    'Saya Fahreza, siswa kelas XI jurusan RPL/PPLG di SMK Wikrama Bogor. Mulai belajar coding dari kelas X.',
    'Saya percaya skill bisa diasah dari mana aja, bukan cuma dari sekolah. Yang penting semangat belajar dan terus praktek!',
  ],
  email: 'fahrezaaboyfiransyah30@gmail.com',
  whatsapp: '+62 895-3821-49107',
  location: 'Bogor, Cigombong, Indonesia',
  github: 'https://github.com/fahrezaaboy',
  linkedin: 'https://linkedin.com/in/fahreza-aboy-firansyah-562725402',
  stats: [
    { value: '2',  label: 'Proyek' },
    { value: '3',  label: 'Tahun Belajar' },
    { value: '1+', label: 'Client' },
  ],
}

export const experiences = [
  {
    period: '2025',
    role: 'Freelance Web Developer',
    place: 'Membuat website tentang panti asuhan dan saya juga membuat website tentang kode pos daerah indonesia',
  },
  {
    period: '2026',
    role: 'PKL / Magang',
    place: '-',
  },
  {
    period: '2022 - Sekarang',
    role: 'Siswa SMK RPL/PPLG',
    place: 'SMK Wikrama Bogor',
  },
]

export const projects = [
  {
    id: 1,
    title: 'Rumah Kasih',
    desc: 'Website panti asuhan. Bisa mendaftarkan, mendonasi & lainnya. Proyek freelance pertamaku!',
    image: "/logo.png",
    tags: ['HTML/CSS', 'PHP', 'Bootstrap', 'Laravel'],
    category: ['sekolah', 'web'],
    github: 'https://github.com/fahrezaaboy/Rumah-Kasih',
    live: '',
  },
  {
    id: 2,
    title: 'Kode pos daerah indonesia',
    desc: 'Proyek yang menampilkan kode pos di seluruh daerah di indonesia.',
    image: "/logobumi.png",
    tags: ['React', 'Bootstrap'],
    category: ['sekolah', 'web'],
    github: 'https://github.com/fahrezaaboy/Kode-pos-daerah-indonesia',
    live: 'https://kode-pos-daerah-indonesia.netlify.app/',
  },
  {
    id: 3,
    title: 'Bolen Crispy With Love',
    desc: 'Proyek website untuk Bolen Crispy With Love. Menampilkan informasi produk dan layanan.',
    image: "/logobolen.png",
    tags: ['React', 'HTML/CSS'],
    category: ['web', 'sekolah'],
    github: 'https://github.com/fahrezaaboy/BolenCrispyWithLove.git',
    live: 'https://portofolio-aboy.netlify.app/',
  },
]

export const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'HTML & CSS',  level: 90 },
      { name: 'JavaScript', level: 75 },
      { name: 'React.js',   level: 65 },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'PHP',     level: 80 },
      { name: 'Laravel', level: 70 },
      { name: 'MySQL',   level: 75 },
    ],
  },
  {
    category: 'Tools & Lainnya',
    items: [
      { name: 'Git & GitHub', level: 72 },
      { name: 'Figma',        level: 60 },
      { name: 'VS Code',      level: 85 },
    ],
  },
]

// Sertifikat (2 saja sesuai permintaan)
// Catatan: file harus ada di folder public/ dengan nama sesuai path pdf di bawah.
export const certificates = [
  {
    title: 'Sertifikat 1',
    year: '2025',
    issuer: 'Belajar Dasar Pemrograman Web',
    pdf: '/certificate-1.pdf',
    image: '/sertifikat-1.png',
  },
  {
    title: 'Sertifikat 2',
    year: '2025',
    issuer: 'Belajar Dasar Pemrograman JavaScript',
    pdf: '/certificate-2.pdf',
    image: '/sertifikat-2.png',
  },
]


