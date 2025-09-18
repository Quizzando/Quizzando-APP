import { Link } from '@tanstack/react-router'
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react'

export const Footer = () => {
  const LINKS = [
    // CURSOS - DISCIPLINAS
    { title: 'Ensino Médio', to: '/cursos' },
    { title: 'Ensino Técnico', to: '/cursos' },
    // NAVEGAÇÃO
    { title: 'Início', to: '/' },
    { title: 'Cursos', to: '/cursos' },
    { title: 'Ranking', to: '/ranking' },
    { title: 'Sobre Nós', to: '/sobre' },
  ]
  const INFO = {
    email: 'quizzandoApp@gmail.com',
    phone: '(11) 99999-9999',
    address: 'R. Nova Granada, 35 | São Paulo, SP - Brasil',
  }

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center space-x-2 font-bold font-['Slackey'] text-background"
            >
              <div className="bg-chart-4 p-3 rounded-sm transition-transform hover:-translate-y-1">
                QU
              </div>
              <div className="bg-chart-2 p-3 rounded-sm transition-transform hover:-translate-y-1">
                IZZ
              </div>
              <div className="bg-chart-5 p-3 rounded-sm transition-transform hover:-translate-y-1">
                AN
              </div>
              <div className="bg-chart-3 p-3 rounded-sm transition-transform hover:-translate-y-1">
                DO
              </div>
            </Link>
            <p className="text-sm text-muted-foreground text-pretty">
              Nosso objetivo é proporcionar aprendizado de qualidade através da
              metodologia de estudo ATIVO com nossos quizzes.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                to="/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                to="/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                to="/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Cursos</h3>
            <ul className="space-y-2 text-sm">
              {LINKS.filter((link) => link.title.includes('Ensino')).map(
                (link) => (
                  <li key={link.title}>
                    <Link
                      to={link.to}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm">
              {LINKS.filter((link) => !link.title.includes('Ensino')).map(
                (link) => (
                  <li key={link.title}>
                    <Link
                      to={link.to}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{INFO.email}</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{INFO.phone}</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{INFO.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Quizzando App. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
