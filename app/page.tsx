"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import {
  Dumbbell,
  MessageCircle,
  Users,
  Home,
  Send,
  Heart,
  Star,
  MapPin,
  Clock,
  User,
  Mail,
  Lock,
  UserPlus,
} from "lucide-react"

export default function NutreinPortal() {
  const [activeSection, setActiveSection] = useState("home")
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", message: "Olá! Sou seu assistente de fitness. Como posso te ajudar hoje?" },
  ])
  const [chatInput, setChatInput] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const professionals = [
    {
      id: 1,
      name: "Dr. Ana Silva",
      specialty: "Nutricionista Esportiva",
      rating: 4.9,
      location: "São Paulo, SP",
      experience: "8 anos",
      image: "/professional-nutritionist-woman.png",
    },
    {
      id: 2,
      name: "Carlos Santos",
      specialty: "Personal Trainer",
      rating: 4.8,
      location: "Rio de Janeiro, RJ",
      experience: "6 anos",
      image: "/personal-trainer-man.png",
    },
    {
      id: 3,
      name: "Mariana Costa",
      specialty: "Fisioterapeuta",
      rating: 4.9,
      location: "Belo Horizonte, MG",
      experience: "10 anos",
      image: "/physiotherapist-woman.png",
    },
  ]

  const exercises = [
    {
      id: 1,
      name: "Supino Reto",
      muscle: "Peito",
      difficulty: "Intermediário",
      image: "/bench-press-exercise.png",
    },
    {
      id: 2,
      name: "Agachamento",
      muscle: "Pernas",
      difficulty: "Iniciante",
      image: "/squat-exercise.png",
    },
    {
      id: 3,
      name: "Barra Fixa",
      muscle: "Costas",
      difficulty: "Avançado",
      image: "/pull-up-exercise.png",
    },
    {
      id: 4,
      name: "Desenvolvimento",
      muscle: "Ombros",
      difficulty: "Intermediário",
      image: "/shoulder-press-exercise.png",
    },
  ]

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([
        ...chatMessages,
        { type: "user", message: chatInput },
        {
          type: "bot",
          message: "Obrigado pela sua pergunta! Estou processando sua solicitação sobre fitness e nutrição.",
        },
      ])
      setChatInput("")
    }
  }

  const handleLogin = (email: string, password: string) => {
    // Simple demo login - in real app would validate against backend
    setUser({ email, name: email.split("@")[0] })
    setIsLoggedIn(true)
  }

  const handleSignup = (name: string, email: string, password: string) => {
    // Simple demo signup - in real app would create user in backend
    setUser({ email, name })
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setUser(null)
    setIsLoggedIn(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">NUTREIN</span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              <Button
                variant={activeSection === "home" ? "default" : "ghost"}
                onClick={() => setActiveSection("home")}
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Início
              </Button>
              <Button
                variant={activeSection === "chat" ? "default" : "ghost"}
                onClick={() => setActiveSection("chat")}
                className="gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Chat IA
              </Button>
              <Button
                variant={activeSection === "professionals" ? "default" : "ghost"}
                onClick={() => setActiveSection("professionals")}
                className="gap-2"
              >
                <Users className="h-4 w-4" />
                Profissionais
              </Button>
              <Button
                variant={activeSection === "exercises" ? "default" : "ghost"}
                onClick={() => setActiveSection("exercises")}
                className="gap-2"
              >
                <Dumbbell className="h-4 w-4" />
                Exercícios
              </Button>
            </div>

            <div className="flex items-center gap-2">
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Olá, {user?.name}</span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Sair
                  </Button>
                </div>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <User className="h-4 w-4" />
                      Entrar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Acesse sua conta</DialogTitle>
                      <DialogDescription>Entre ou crie uma nova conta para acessar todos os recursos</DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="login" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Entrar</TabsTrigger>
                        <TabsTrigger value="signup">Cadastrar</TabsTrigger>
                      </TabsList>
                      <TabsContent value="login" className="space-y-4">
                        <LoginForm onLogin={handleLogin} />
                      </TabsContent>
                      <TabsContent value="signup" className="space-y-4">
                        <SignupForm onSignup={handleSignup} />
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Home Section */}
        {activeSection === "home" && (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-6 py-12">
              <h1 className="text-4xl md:text-6xl font-bold text-balance">
                Bem-vindo ao <span className="text-primary">Nutrein</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                Seu portal completo para fitness, saúde e bem-estar. Conecte-se com profissionais, descubra exercícios e
                converse com nossa IA especializada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => setActiveSection("chat")} className="gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Chat com IA
                </Button>
                <Button size="lg" variant="outline" onClick={() => setActiveSection("professionals")} className="gap-2">
                  <Users className="h-5 w-5" />
                  Profissionais
                </Button>
              </div>
            </section>

            {/* Features */}
            <section className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Chat Inteligente</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Converse com nossa IA especializada em fitness e nutrição para tirar dúvidas e receber orientações
                    personalizadas.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Profissionais</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Encontre nutricionistas e treinadores especializados em diversos esportes para te ajudar a alcançar
                    seus objetivos.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Dumbbell className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Exercícios</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Biblioteca completa de exercícios organizados por grupo muscular com instruções detalhadas.
                  </CardDescription>
                </CardContent>
              </Card>
            </section>
          </div>
        )}

        {/* Chat Section */}
        {activeSection === "chat" && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                <MessageCircle className="h-8 w-8 text-primary" />
                Chat com IA - Assistente de Fitness
              </h2>
              <p className="text-muted-foreground">Faça perguntas sobre exercícios, nutrição e saúde</p>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="h-96 overflow-y-auto p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Heart className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Olá! Sou seu assistente de fitness. Como posso te ajudar hoje?</p>
                    </div>
                  </div>

                  {chatMessages.slice(1).map((msg, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 ${msg.type === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          msg.type === "user" ? "bg-primary text-primary-foreground" : "bg-primary/10"
                        }`}
                      >
                        {msg.type === "user" ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Heart className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div
                        className={`rounded-lg p-3 max-w-xs ${
                          msg.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Digite sua pergunta sobre fitness..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} className="gap-2">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Professionals Section */}
        {activeSection === "professionals" && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Nossos Profissionais</h2>
              <p className="text-muted-foreground">
                Especialistas qualificados para te ajudar a alcançar seus objetivos
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professionals.map((professional) => (
                <Card key={professional.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={professional.image || "/placeholder.svg"}
                        alt={professional.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{professional.name}</h3>
                        <p className="text-sm text-muted-foreground">{professional.specialty}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{professional.rating}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{professional.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{professional.experience}</span>
                      </div>
                    </div>

                    <Button className="w-full">Agendar Consulta</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Exercises Section */}
        {activeSection === "exercises" && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Biblioteca de Exercícios</h2>
              <p className="text-muted-foreground">Exercícios organizados por grupo muscular</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {exercises.map((exercise) => (
                <Card key={exercise.id} className="overflow-hidden">
                  <div className="aspect-video">
                    <img
                      src={exercise.image || "/placeholder.svg"}
                      alt={exercise.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{exercise.name}</h3>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{exercise.muscle}</Badge>
                      <Badge
                        variant={
                          exercise.difficulty === "Iniciante"
                            ? "default"
                            : exercise.difficulty === "Intermediário"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {exercise.difficulty}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Dumbbell className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Nutrein</span>
            </div>
            <p className="text-muted-foreground">Transformando vidas através do fitness e bem-estar</p>
            <p className="text-sm text-muted-foreground">© 2025 Nutrein. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Login Form Component
function LoginForm({ onLogin }: { onLogin: (email: string, password: string) => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Entrar
      </Button>
    </form>
  )
}

// Signup Form Component
function SignupForm({ onSignup }: { onSignup: (name: string, email: string, password: string) => void }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSignup(name, email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <div className="relative">
          <UserPlus className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="name"
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="signup-email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Senha</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="signup-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Criar Conta
      </Button>
    </form>
  )
}
