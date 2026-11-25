import { pathToFileURL } from 'node:url'
import { initSchema } from './db.js'

export const seedData = {
  profile: {
    name: 'Fahreza Aboy Firansyah',
    role_id: 'Web Developer Muda',
    role_en: 'Young Web Developer',
    school: 'SMK Wikrama Bogor',
    major_id: 'Rekayasa Perangkat Lunak (RPL)',
    major_en: 'Software Engineering (RPL/PPLG)',
    grade_id: 'Kelas XI',
    grade_en: '11th Grade',
    bio_id: [
      'Saya Fahreza, siswa kelas XI jurusan RPL/PPLG di SMK Wikrama Bogor. Mulai belajar coding sejak kelas X.',
      'Saya percaya skill bisa diasah dari mana aja, bukan cuma dari sekolah. Yang penting semangat belajar dan terus praktek membangun produk nyata!',
    ],
    bio_en: [
      "I'm Fahreza, an 11th-grade Software Engineering (RPL/PPLG) student at SMK Wikrama Bogor. I started coding in 10th grade.",
      'I believe skills can be honed anywhere, not just in the classroom. What matters most is staying curious and building real-world projects!',
    ],
    email: 'fahrezaaboyfiransyah30@gmail.com',
    whatsapp: '+62 895-3821-49107',
    location: 'Bogor, Cigombong, Indonesia',
    github: 'https://github.com/fahrezaaboy',
    linkedin: 'https://linkedin.com/in/fahreza-aboy-firansyah-562725402',
    stats: [
      { value: '06+', label_id: 'Proyek Selesai', label_en: 'Projects Built' },
      { value: '03', label_id: 'Tahun Belajar', label_en: 'Years Learning' },
      { value: '01+', label_id: 'Klien Nyata', label_en: 'Real Client' },
    ],
  },
  experiences: [
    {
      sort_order: 1,
      period_id: '2025 - 2026',
      period_en: '2025 - 2026',
      role_id: 'Freelance Web Developer',
      role_en: 'Freelance Web Developer',
      place_id:
        'Membangun berbagai website seperti panti asuhan Rumah Kasih, pencarian kode pos daerah Indonesia, katalog Bolen Crispy With Love, sistem manajemen sekolah SIMKA, dashboard travel Bursa Umrah, hingga e-commerce peralatan perikanan elektrik.',
      place_en:
        'Built web applications including the Rumah Kasih orphanage platform, Indonesian postal code finder, Bolen Crispy With Love showcase, SIMKA school management system, Bursa Umrah travel dashboard, and an electric fishery e-commerce site.',
    },
    {
      sort_order: 2,
      period_id: '2026',
      period_en: '2026',
      role_id: 'PKL / Magang Industri',
      role_en: 'Internship / Industrial Training',
      place_id: 'PT. Robust Creative Media',
      place_en: 'PT. Robust Creative Media',
    },
    {
      sort_order: 3,
      period_id: '2026 - Sekarang',
      period_en: '2026 - Present',
      role_id: 'Siswa SMK RPL / PPLG',
      role_en: 'Vocational Software Engineering Student',
      place_id: 'SMK Wikrama Bogor',
      place_en: 'SMK Wikrama Bogor',
    },
  ],
  projects: [
    {
      sort_order: 1,
      title_id: 'Rumah Kasih',
      title_en: 'Rumah Kasih',
      desc_id:
        'Website panti asuhan untuk informasi lembaga, pendaftaran, donasi online, dan pengelolaan konten. Proyek freelance pertamaku!',
      desc_en:
        'Orphanage web platform supporting registration, donations, and community outreach. My very first freelance project!',
      image: '/logo.png',
      tags: ['HTML/CSS', 'PHP', 'Bootstrap', 'Laravel'],
      category: ['sekolah', 'web'],
      github: 'https://github.com/fahrezaaboy/Rumah-Kasih',
      live: 'https://rumahkasih.netlify.app/',
      featured: 1,
    },
    {
      sort_order: 2,
      title_id: 'Kode Pos Daerah Indonesia',
      title_en: 'Indonesia Postal Code Finder',
      desc_id:
        'Aplikasi web interaktif untuk mencari dan menampilkan kode pos di seluruh wilayah Indonesia secara cepat.',
      desc_en:
        'Interactive web application to search and browse postal codes across regions in Indonesia quickly.',
      image: '/logobumi.png',
      tags: ['React', 'Bootstrap'],
      category: ['sekolah', 'web'],
      github: 'https://github.com/fahrezaaboy/Kode-pos-daerah-indonesia',
      live: 'https://kode-pos-daerah-indonesia.netlify.app/',
      featured: 1,
    },
    {
      sort_order: 3,
      title_id: 'Bolen Crispy With Love',
      title_en: 'Bolen Crispy With Love',
      desc_id:
        'Website showcase produk kuliner untuk Bolen Crispy With Love yang menampilkan katalog menu, detail layanan, dan pemesanan.',
      desc_en:
        'Culinary product showcase website for Bolen Crispy With Love featuring product catalog, brand story, and ordering info.',
      image: '/logobolen.png',
      tags: ['React', 'HTML/CSS'],
      category: ['web', 'sekolah'],
      github: 'https://github.com/fahrezaaboy/BolenCrispyWithLove.git',
      live: 'https://bolencrispywithlove.netlify.app/',
      featured: 1,
    },
    {
      sort_order: 4,
      title_id: 'SIMKA — Sistem Informasi Manajemen Sekolah & Yayasan',
      title_en: 'SIMKA — School & Foundation Management System',
      desc_id:
        'Website sistem manajemen sekolah dan yayasan dengan fitur multi-role: siswa dapat login untuk melihat serta mengerjakan tugas, dan guru dapat login untuk memberikan serta mengelola tugas sekolah.',
      desc_en:
        'School and foundation management web platform with multi-role login: students can log in to complete assignments, while teachers can log in to create and distribute school tasks.',
      image: '/simka.jpg',
      tags: ['Web App', 'Multi-Role', 'E-Learning'],
      category: ['web', 'sekolah'],
      github: '',
      live: 'https://yayasan.online.wanteknologi.com/login',
      featured: 1,
    },
    {
      sort_order: 5,
      title_id: 'Bursa Umrah — Dashboard Travel Umrah',
      title_en: 'Bursa Umrah — Umrah Travel Dashboard',
      desc_id:
        'Platform web dan admin dashboard terpadu untuk mengelola paket umrah, perjalanan, manifest jamaah, dan layanan travel Bursa Umrah dalam satu tempat.',
      desc_en:
        'Integrated web platform and admin dashboard for managing Umrah packages, itineraries, pilgrim manifests, and Bursa Umrah travel services in one place.',
      image: '/bursa-umrah.jpg',
      tags: ['Web App', 'Admin Dashboard', 'Travel'],
      category: ['web'],
      github: '',
      live: 'https://umroh-dashboard.online.wanteknologi.com/login',
      featured: 1,
    },
    {
      sort_order: 6,
      title_id: 'Peralatan Memancing Modern — E-Commerce Perikanan Elektrik',
      title_en: 'Modern Fishing Gear — Electric Fishery E-Commerce',
      desc_id:
        'Website e-commerce bergaya marketplace untuk penjualan peralatan memancing modern dan perikanan elektrik (strum ikan), dilengkapi katalog produk, keranjang belanja, multi-bahasa, dan fitur login.',
      desc_en:
        'Marketplace-style e-commerce web platform for modern fishing gear and electric fishery equipment, featuring a product catalog, shopping cart, multi-language support, and user login.',
      image: '/fishing-shop.jpg',
      tags: ['E-Commerce', 'Marketplace', 'Web App'],
      category: ['web'],
      github: '',
      live: 'https://ecommerce-fish-electrocution.netlify.app/',
      featured: 1,
    },
  ],
  skills: [
    {
      sort_order: 1,
      category_id: 'Frontend',
      category_en: 'Frontend',
      items: [
        { name: 'Next.js', level: 78 },
        { name: 'React.js', level: 75 },
        { name: 'JavaScript', level: 78 },
        { name: 'Tailwind CSS', level: 82 },
        { name: 'Bootstrap', level: 80 },
      ],
    },
    {
      sort_order: 2,
      category_id: 'Backend',
      category_en: 'Backend',
      items: [
        { name: 'PHP', level: 80 },
        { name: 'Laravel', level: 70 },
        { name: 'NestJS', level: 68 },
        { name: 'Node.js & Express', level: 68 },
        { name: 'MySQL / SQLite', level: 75 },
      ],
    },
    {
      sort_order: 3,
      category_id: 'Tools & Lainnya',
      category_en: 'Tools & Others',
      items: [
        { name: 'VS Code', level: 85 },
        { name: 'Antigravity', level: 82 },
        { name: 'Git & GitHub', level: 75 },
        { name: 'GitLab', level: 72 },
        { name: 'Figma', level: 65 },
      ],
    },
  ],
  certificates: [
    {
      sort_order: 1,
      title_id: 'Sertifikat Dasar Pemrograman Web',
      title_en: 'Web Programming Fundamentals Certificate',
      year: '2025',
      issuer_id: 'Belajar Dasar Pemrograman Web',
      issuer_en: 'Web Programming Fundamentals Course',
      pdf: '/certificate-1.pdf',
      image: '/sertifikat-1.png',
    },
    {
      sort_order: 2,
      title_id: 'Sertifikat Dasar Pemrograman JavaScript',
      title_en: 'JavaScript Programming Fundamentals Certificate',
      year: '2025',
      issuer_id: 'Belajar Dasar Pemrograman JavaScript',
      issuer_en: 'JavaScript Fundamentals Course',
      pdf: '/certificate-2.pdf',
      image: '/sertifikat-2.png',
    },
  ],
}

export async function seedDatabase({ force = false } = {}) {
  const db = await initSchema()
  if (!db) return false

  const existingProfile = db.prepare('SELECT id FROM profile WHERE id = 1').get()
  if (existingProfile && !force) {
    return false
  }

  db.exec('BEGIN')
  try {
    if (force) {
      db.exec(`
        DELETE FROM profile;
        DELETE FROM experiences;
        DELETE FROM projects;
        DELETE FROM skill_groups;
        DELETE FROM certificates;
      `)
    }

    const p = seedData.profile
    db.prepare(`
      INSERT OR REPLACE INTO profile (
        id, name, role_id, role_en, school, major_id, major_en,
        grade_id, grade_en, bio_id_json, bio_en_json,
        email, whatsapp, location, github, linkedin, stats_json
      ) VALUES (
        1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `).run(
      p.name,
      p.role_id,
      p.role_en,
      p.school,
      p.major_id,
      p.major_en,
      p.grade_id,
      p.grade_en,
      JSON.stringify(p.bio_id),
      JSON.stringify(p.bio_en),
      p.email,
      p.whatsapp,
      p.location,
      p.github,
      p.linkedin,
      JSON.stringify(p.stats)
    )

    const insertExp = db.prepare(`
      INSERT INTO experiences (sort_order, period_id, period_en, role_id, role_en, place_id, place_en)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    for (const exp of seedData.experiences) {
      insertExp.run(
        exp.sort_order,
        exp.period_id,
        exp.period_en,
        exp.role_id,
        exp.role_en,
        exp.place_id,
        exp.place_en
      )
    }

    const insertProj = db.prepare(`
      INSERT INTO projects (sort_order, title_id, title_en, desc_id, desc_en, image, tags_json, category_json, github, live, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    for (const proj of seedData.projects) {
      insertProj.run(
        proj.sort_order,
        proj.title_id,
        proj.title_en,
        proj.desc_id,
        proj.desc_en,
        proj.image,
        JSON.stringify(proj.tags),
        JSON.stringify(proj.category),
        proj.github,
        proj.live,
        proj.featured
      )
    }

    const insertSkill = db.prepare(`
      INSERT INTO skill_groups (sort_order, category_id, category_en, items_json)
      VALUES (?, ?, ?, ?)
    `)
    for (const group of seedData.skills) {
      insertSkill.run(
        group.sort_order,
        group.category_id,
        group.category_en,
        JSON.stringify(group.items)
      )
    }

    const insertCert = db.prepare(`
      INSERT INTO certificates (sort_order, title_id, title_en, year, issuer_id, issuer_en, pdf, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    for (const cert of seedData.certificates) {
      insertCert.run(
        cert.sort_order,
        cert.title_id,
        cert.title_en,
        cert.year,
        cert.issuer_id,
        cert.issuer_en,
        cert.pdf,
        cert.image
      )
    }

    db.exec('COMMIT')
    return true
  } catch (error) {
    db.exec('ROLLBACK')
    throw error
  }
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) {
  const force = process.argv.includes('--force')
  const seeded = await seedDatabase({ force })
  console.log(seeded ? 'Database seeded successfully.' : 'Database already seeded (use --force to reseed).')
}
