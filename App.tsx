
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  MessageCircle, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  Scale, 
  X, 
  Menu,
  Plus, 
  Award,
  ArrowLeft
} from 'lucide-react';

const WHATS_NUMBER = "5511999999999";

// --- Componente de Logo atualizado com link externo ---
const LocalLogo = ({ className = "h-12" }: { className?: string }) => (
  <img 
    src="https://i.imgur.com/9YZOyhA.png" 
    alt="Protocolo Odonto Logo" 
    className={`${className} object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-500 brightness-110`}
  />
);

// --- Componente de Texto Jurídico Overlay ---
const LegalOverlay = ({ type, isOpen, onClose }: { type: 'terms' | 'privacy', isOpen: boolean, onClose: () => void }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => { 
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const content = {
    terms: {
      title: "Termos de Uso",
      sections: [
        { h: "1. Aceitação dos Termos", p: "Ao acessar o Protocolo Odonto, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis. Este site é uma plataforma de apresentação de serviços de consultoria de marketing e aceleração para clínicas odontológicas." },
        { h: "2. Natureza do Diagnóstico", p: "O 'Diagnóstico Estratégico' oferecido é uma análise de viabilidade comercial e de marketing. Não constitui, em nenhuma hipótese, diagnóstico médico, odontológico ou aconselhamento clínico. As sugestões de escala e faturamento são baseadas em métricas de mercado e não garantem resultados idênticos para todos os cenários." },
        { h: "3. Propriedade Intelectual", p: "Todo o conteúdo, design, logotipos e metodologias (como o 'Protocolo de Conversão Premium') são de propriedade exclusiva da Protocolo Odonto. A reprodução não autorizada de nossos métodos de filtragem ou scripts de vendas está sujeita a medidas legais." },
        { h: "4. Limitação de Responsabilidade", p: "A Protocolo Odonto não se responsabiliza por decisões clínicas tomadas pelo profissional ou por eventuais infrações éticas cometidas pela clínica fora das diretrizes de publicidade fornecidas em nossa consultoria oficial." }
      ]
    },
    privacy: {
      title: "Política de Privacidade",
      sections: [
        { h: "1. Coleta de Dados", p: "Coletamos informações através de nosso formulário de diagnóstico (faturamento mensal, desafios de escala, investimento em tráfego) e via contato direto pelo WhatsApp. Esses dados são essenciais para personalizar sua estratégia." },
        { h: "2. Uso das Informações (LGPD)", p: "Seus dados são utilizados exclusivamente para: (a) Validar seu perfil para o Protocolo Odonto; (b) Entrar em contato para agendamento; (c) Enviar comunicações estratégicas sobre crescimento clínico. Não compartilhamos seus dados financeiros com terceiros." },
        { h: "3. Sigilo Ético", p: "Entendemos que os dados de faturamento e operação de sua clínica são sensíveis. Tratamos todas as informações sous rigoroso sigilo comercial e ético, em conformidade com a Lei Geral de Proteção de Dados (LGPD)." },
        { h: "4. Seus Direitos", p: "Você possui o direito de solicitar a exclusão de seus dados de nossa base de leads a qualquer momento, bastando enviar uma mensagem com a palavra 'REMOVER' em nossos canais oficiais." }
      ]
    }
  };

  const active = content[type];

  return (
    <div className="fixed inset-0 z-[999] bg-[#020617] overflow-y-auto pt-16 md:pt-24 pb-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto relative z-10">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-[10px] mb-8 md:mb-12 hover:opacity-70 transition-opacity bg-white/5 px-4 py-2 rounded-full"
        >
          <ArrowLeft size={16} /> Voltar
        </button>
        
        <h2 className="text-3xl md:text-7xl font-cinzel font-bold mb-10 md:mb-16 gold-gradient leading-tight">{active.title}</h2>
        
        <div className="space-y-10 md:space-y-16">
          {active.sections.map((s, i) => (
            <div key={i} className="space-y-4 md:space-y-6">
              <h3 className="text-xl md:text-2xl font-cinzel font-bold text-white/90 border-l-4 border-gold pl-4 md:pl-6">{s.h}</h3>
              <p className="text-white/60 leading-relaxed text-sm md:text-lg">{s.p}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-24 pt-12 border-t border-white/10 text-center">
          <LocalLogo className="h-8 md:h-10 mx-auto mb-6 opacity-40 grayscale" />
          <p className="text-[10px] uppercase tracking-widest text-white/20 font-black">
            © 2026 Protocolo Odonto • Engenharia de Aquisição Ética
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Interactive Particle Background (Enhanced Visibility & Movement) ---
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, radius: 150 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number; y: number; size: number; vx: number; vy: number; density: number; color: string;
      constructor(x: number, y: number) {
        this.x = x; 
        this.y = y; 
        this.size = Math.random() * 2.5 + 1;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4; 
        this.density = (Math.random() * 20) + 1;
        this.color = Math.random() > 0.4 ? 'rgba(212, 175, 55, 0.6)' : 'rgba(212, 175, 55, 0.2)';
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color; 
        ctx.beginPath(); 
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); 
        ctx.fill();
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        let dx = mouse.x - this.x; 
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          let force = (mouse.radius - distance) / mouse.radius;
          this.x -= (dx / distance) * force * this.density;
          this.y -= (dy / distance) * force * this.density;
        }
      }
    }

    const init = () => {
      particles = [];
      const num = (canvas.width * canvas.height) / 8000;
      for (let i = 0; i < num; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { 
        p.update(); 
        p.draw(); 
      });
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => { 
      mouse.x = e.clientX; 
      mouse.y = e.clientY; 
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const handleInteractionEnd = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleInteractionEnd);
    
    resize(); 
    init(); 
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchend', handleInteractionEnd);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-80" />;
};

const SectionHeading = ({ title, subtitle, centered = false }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-10 md:mb-16 ${centered ? 'text-center' : 'text-left'}`}>
    {subtitle && <p className="text-gold-gradient font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs mb-3 md:mb-4">{subtitle}</p>}
    <h2 className="text-3xl md:text-6xl font-cinzel font-bold leading-tight max-w-4xl mx-auto">{title}</h2>
  </div>
);

const DiagnosticModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<string[]>([]);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      setStep(1);
      setAnswers([]);
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => { 
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const questions = [
    { 
      id: "faturamento",
      q: "Qual o seu faturamento mensal atual?", 
      options: ["Até 50k", "50k a 150k", "Acima de 150k"] 
    },
    { 
      id: "desafio",
      q: "Qual o seu maior desafio hoje?", 
      options: ["Trazer leads qualificados", "Converter leads no WhatsApp", "Escalar sem infringir o CRO"] 
    },
    { 
      id: "trafego",
      q: "Você já investe em tráfego pago?", 
      options: ["Não invisto", "Menos de 2k/mês", "Acima de 5k/mês"] 
    }
  ];

  const handleOptionSelect = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (step < questions.length) {
      setStep(step + 1);
    } else {
      const message = `Olá! Acabei de realizar o Diagnóstico Estratégico no site Protocolo Odonto.

Estes são os meus dados para análise:
📍 Faturamento: ${newAnswers[0]}
🎯 Maior Desafio: ${newAnswers[1]}
🚀 Investimento Atual: ${newAnswers[2]}

Gostaria de agendar o meu diagnóstico agora.`;

      const encodedMessage = encodeURIComponent(message);
      const finalUrl = `https://wa.me/${WHATS_NUMBER}?text=${encodedMessage}`;
      window.open(finalUrl, '_blank');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="max-w-xl w-full premium-card p-6 md:p-10 rounded-3xl relative overflow-hidden border-gold/30">
        <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 text-white/40 hover:text-white transition-colors z-20"><X size={24}/></button>
        
        <div className="mb-6 md:mb-8 relative z-10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] md:text-[10px] font-bold text-gold uppercase tracking-[0.2em]">Passo {step} de {questions.length}</span>
            <span className="text-[9px] md:text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Diagnóstico</span>
          </div>
          <div className="w-full bg-white/5 h-1 md:h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gold-metallic h-full transition-all duration-700 ease-out shadow-[0_0_10px_#D4AF37]" 
              style={{ width: `${(step/questions.length)*100}%` }}
            ></div>
          </div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl md:text-3xl font-cinzel font-bold mb-6 md:mb-8 leading-tight animate-fade-in">{questions[step-1].q}</h3>
          <div className="space-y-2 md:space-y-3 mb-8 md:mb-10">
            {questions[step-1].options.map((opt, i) => (
              <button 
                key={i} 
                onClick={() => handleOptionSelect(opt)} 
                className="group w-full text-left p-4 md:p-5 rounded-xl md:rounded-2xl border border-white/10 hover:border-gold/50 hover:bg-gold/5 transition-all duration-300 flex justify-between items-center"
              >
                <span className="text-white/80 font-medium text-base md:text-lg group-hover:text-gold transition-colors">{opt}</span>
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-white/20 group-hover:border-gold group-hover:bg-gold/10 flex items-center justify-center transition-all">
                   <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </button>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 md:gap-3 py-3 md:py-4 border-t border-white/5">
             <ShieldCheck size={14} className="text-gold/50" />
             <p className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold">Protocolo de Sigilo Ético</p>
          </div>
        </div>
        
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gold/5 blur-[60px] rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [legalView, setLegalView] = useState<'terms' | 'privacy' | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Configuração das âncoras para evitar erros de acentuação no ID técnico
  const navItems = [
    { label: 'Gargalo', id: 'gargalo' },
    { label: 'Método', id: 'metodo' },
    { label: 'Segurança', id: 'seguranca' },
    { label: 'FAQ', id: 'faq' }
  ];

  return (
    <div className="relative w-full overflow-x-hidden min-h-screen">
      <ParticleBackground />
      <div className="glow-sphere w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gold top-[-150px] right-[-50px] md:top-[-250px] md:right-[-100px]"></div>
      <div className="glow-sphere w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-500 bottom-[10%] left-[-150px] md:left-[-200px]"></div>

      <DiagnosticModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-deep-navy/95 backdrop-blur-xl py-3 md:py-4 border-b border-white/[0.02] shadow-2xl' : 'py-5 md:py-8 border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 md:gap-4 cursor-pointer group" onClick={(e) => scrollToSection(e, 'top')}>
            <LocalLogo className="h-8 md:h-12 w-auto group-hover:scale-110" />
            <span className="text-white font-cinzel font-bold text-xs sm:text-sm md:text-xl tracking-[0.2em] uppercase whitespace-nowrap">Protocolo Odonto</span>
          </div>
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map(item => (
              <a key={item.id} href={`#${item.id}`} onClick={(e) => scrollToSection(e, item.id)} className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-gold transition-colors">{item.label}</a>
            ))}
            <button onClick={() => setIsModalOpen(true)} className="bg-gold-metallic text-black px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg font-black">Agendar Diagnóstico</button>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="lg:hidden bg-gold-metallic text-black px-5 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg font-black"
          >
            Agendar Diagnóstico
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="top" className="min-h-screen flex items-center pt-32 md:pt-44 pb-16 md:pb-20 px-4 md:px-6 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-16 items-center w-full">
          <div className="space-y-6 md:space-y-10 text-center lg:text-left relative z-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold text-[9px] md:text-[10px] font-bold tracking-widest uppercase mx-auto lg:mx-0">
              <Award size={14} /> Especialistas em High-Ticket
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[60px] xl:text-[76px] font-cinzel font-bold leading-[1.05] md:leading-[1.1] relative z-20 pr-4">
              A&nbsp;Engenharia por trás das <br className="hidden md:block" />
              <span className="gold-gradient">Agendas de Elite.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-xl font-medium mx-auto lg:mx-0">Nós construímos o Protocolo Ético que atrai pacientes de alto valor e blinda sua clínica contra o amadorismo digital.</p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start">
              <button onClick={() => setIsModalOpen(true)} className="bg-gold-metallic text-black px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3">DIAGNÓSTICO GRATUITO <ArrowRight size={20} /></button>
              <div className="flex items-center justify-center gap-3 md:gap-4 text-white/40">
                <ShieldCheck size={28} className="text-gold shrink-0" />
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest leading-tight text-left">Seguro para <br/> CFO e CRO</span>
              </div>
            </div>
          </div>
          <div className="relative lg:block hidden">
            <div className="relative z-10 w-full aspect-square rounded-[60px] overflow-hidden border border-white/10 premium-card p-4 animate-float shadow-[0_0_60px_rgba(212,175,55,0.1)]">
               <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800" alt="Clinic Interior" className="w-full h-full object-cover rounded-[40px] grayscale-[0.3]" />
            </div>
          </div>
        </div>
      </header>

      {/* Pain Section */}
      <section id="gargalo" className="py-20 md:py-32 bg-slate-950 border-y border-white/[0.03] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeading subtitle="O GARGALO INVISÍVEL" title="Por que investir em tráfego sem um protocolo é queimar dinheiro?" centered />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: <X className="text-red-500" />, t: "Volume sem Valor", d: "Sua equipe perde tempo atendendo 'curiosos' que só perguntam o preço e nunca agendam." },
              { icon: <Scale className="text-gold" />, t: "O Risco Ético", d: "Anúncios amadores que geram denúncias no CRO e colocam seu registro em risco desnecessário." },
              { icon: <TrendingUp className="text-red-500" />, t: "Escala Cega", d: "Você gasta mais em anúncios, mas o faturamento não sobe na mesma proporção." }
            ].map((card, i) => (
              <div key={i} className="premium-card p-8 md:p-10 rounded-2xl md:rounded-3xl space-y-4 md:space-y-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-xl flex items-center justify-center">{card.icon}</div>
                <h3 className="text-lg md:text-xl font-cinzel font-bold">{card.t}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{card.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Method Section */}
      <section id="metodo" className="py-20 md:py-32 bg-deep-navy overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="space-y-6 md:space-y-8">
            <SectionHeading subtitle="A SOLUÇÃO" title="Protocolo Odonto: Os 3 Pilares da Conversão Premium" />
            <div className="space-y-5 md:space-y-6">
              {[
                { t: "Filtro de Qualificação Ativo", d: "Criativos e anúncios desenhados para atrair pacientes que valorizam a saúde." },
                { t: "Roteiro de Fechamento Magnético", d: "Treinamos sua recepção com scripts validados que transformam mensagens em consultas." },
                { t: "Engenharia de Dados Puros", d: "Rastreamento total de cada centavo investido." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 md:gap-6 items-start group">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center shrink-0 text-gold font-bold text-sm">0{i+1}</div>
                  <div>
                    <h4 className="text-base md:text-lg font-cinzel font-bold mb-1 md:mb-2 group-hover:text-gold transition-colors">{item.t}</h4>
                    <p className="text-white/50 text-xs md:text-sm">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="premium-card p-8 md:p-12 rounded-[30px] md:rounded-[40px] text-center relative overflow-hidden group min-h-[300px] md:min-h-[400px] flex flex-col items-center justify-center shadow-2xl">
             <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200" 
                  alt="High-end Dental Technology" 
                  className="w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-1000 grayscale-[0.5]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/80 via-deep-navy/40 to-deep-navy/90"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]"></div>
             </div>

             <div className="relative z-10">
                <LocalLogo className="h-20 md:h-32 mx-auto mb-6 md:mb-8 animate-float drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" />
                <p className="text-gold-gradient font-cinzel font-bold text-2xl md:text-4xl mb-2 md:mb-3 tracking-wider">Engenharia Ética</p>
                <div className="w-10 md:w-12 h-0.5 md:h-1 bg-gold/30 mx-auto mb-3 md:mb-4 rounded-full"></div>
                <p className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/80 font-black">Focada em LTV e Lucro Real</p>
             </div>

             <div className="absolute inset-3 md:inset-4 border border-gold/10 rounded-[20px] md:rounded-[30px] pointer-events-none group-hover:border-gold/30 transition-colors"></div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section id="seguranca" className="py-20 md:py-32 bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeading subtitle="SEGURANÇA JURÍDICA" title="Sua reputação é o seu maior ativo." centered />
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            <div className="premium-card p-6 md:p-10 rounded-2xl md:rounded-3xl bg-red-950/10 border-red-500/20">
              <h3 className="text-red-500 font-cinzel font-bold text-xl md:text-2xl mb-6 md:mb-8">O Erro Comum</h3>
              <ul className="space-y-3 md:space-y-4 text-white/60 text-xs md:text-sm italic">
                <li>• Mostrar "Antes e Depois" sensacionalistas</li>
                <li>• Divulgar preços e parcelamentos em anúncios</li>
                <li>• Promessas de "100% de Garantia"</li>
              </ul>
            </div>
            <div className="premium-card p-6 md:p-10 rounded-2xl md:rounded-3xl bg-gold/5 border-gold/40">
              <h3 className="text-gold-gradient font-cinzel font-bold text-xl md:text-2xl mb-6 md:mb-8">O Nosso Padrão</h3>
              <ul className="space-y-3 md:space-y-4 text-white/90 text-xs md:text-sm font-bold">
                <li>• Conteúdo Educativo e Institucional</li>
                <li>• Valorização da Especialidade e do CRO</li>
                <li>• Filtro por autoridade e prestígio clínico</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32 bg-deep-navy border-t border-white/[0.03] overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <SectionHeading title="FAQ" centered />
          <div className="space-y-4 md:space-y-6">
            {[
              { q: "Isso funciona para qualquer especialidade?", a: "Sim. O Protocolo é adaptado para Implantes, Harmonização, Ortodontia ou Clínica Geral." },
              { q: "Preciso ter uma equipe de vendas?", a: "Não. Nós estruturamos o processo para que sua secretária consiga realizar o agendamento profissionalmente." },
              { q: "Em quanto tempo vejo os primeiros pacientes?", a: "A fase de implementação dura 7 dias. Geralmente, as consultas surgem na segunda semana." }
            ].map((faq, i) => (
              <div key={i} className="premium-card p-6 md:p-8 rounded-xl md:rounded-2xl group cursor-help">
                <h4 className="text-base md:text-lg font-cinzel font-bold mb-3 md:mb-4 flex justify-between items-center text-gold group-hover:text-white transition-colors">{faq.q} <Plus size={18} /></h4>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-20 border-t border-white/5 bg-deep-navy overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10 text-center md:text-left">
          <div className="flex items-center gap-3 md:gap-4 cursor-pointer group" onClick={(e) => scrollToSection(e, 'top')}>
            <LocalLogo className="h-8 md:h-10 w-auto group-hover:rotate-12 transition-transform duration-500" />
            <span className="text-white font-cinzel font-bold tracking-[0.2em] text-xs md:text-sm uppercase">Protocolo Odonto</span>
          </div>
          <div className="flex gap-6 md:gap-8">
            <button onClick={() => setLegalView('terms')} className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors font-black">Termos</button>
            <button onClick={() => setLegalView('privacy')} className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors font-black">Privacidade</button>
          </div>
          <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/20 font-black">© 2026 Protocolo Odonto • Engenharia de Aquisição Ética</p>
        </div>
      </footer>

      {/* Floating WA Button */}
      <a href={`https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre o Protocolo Odonto.')}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[150] bg-[#25D366] text-white p-4 md:p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all whatsapp-pulse">
        <MessageCircle size={28} fill="white" className="md:w-8 md:h-8" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4 md:h-5 md:w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 md:h-5 md:w-5 bg-red-500 text-[8px] md:text-[10px] items-center justify-center font-bold shadow-lg">1</span>
        </span>
      </a>

      {/* Overlay Jurídico */}
      <LegalOverlay 
        type={legalView === 'terms' ? 'terms' : 'privacy'} 
        isOpen={legalView !== null} 
        onClose={() => setLegalView(null)} 
      />
    </div>
  );
}
