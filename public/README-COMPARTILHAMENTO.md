# 📱 Imagem de Compartilhamento - JP Traslados

## 🎯 Objetivo

Criar uma imagem otimizada para compartilhamento do cartão digital com:
- ✅ **Fundo preto sólido**
- ✅ **Logo dourado centralizado**
- ✅ **Sem cortes**
- ✅ **Alta qualidade**

## 📋 Como Gerar

### 1. **Acesse o Gerador:**
```
http://localhost:3001/generate-share-image.html
```
ou
```
https://jptraslados.com.br/generate-share-image.html
```

### 2. **Baixe a Imagem:**
- Clique em "📥 Baixar Imagem"
- Salve como `share-card.png`
- Coloque na pasta `public/images/`

### 3. **Resultado:**
- ✅ **Dimensões:** 1200x630 pixels
- ✅ **Formato:** PNG de alta qualidade
- ✅ **Compatibilidade:** WhatsApp, Instagram, Facebook, Twitter

## 🎨 Características da Imagem

### **Design:**
- **Fundo:** Preto sólido (#000000)
- **Logo:** Círculo dourado com "JP" em preto
- **Título:** "JP TRASLADOS" em dourado
- **Subtítulo:** "Cartão Digital" em branco
- **Descrição:** "Transporte Executivo em São Paulo" em cinza

### **Dimensões:**
- **Largura:** 1200px
- **Altura:** 630px
- **Proporção:** 1.91:1 (ideal para redes sociais)
- **Qualidade:** PNG com transparência

## 📱 Onde é Usado

### **Compartilhamento:**
- ✅ **WhatsApp:** Link preview
- ✅ **Instagram:** Story/Link preview
- ✅ **Facebook:** Post preview
- ✅ **Twitter:** Tweet preview
- ✅ **LinkedIn:** Post preview

### **Meta Tags:**
```html
<!-- Open Graph -->
<meta property="og:image" content="/images/share-card.png" />

<!-- Twitter Card -->
<meta name="twitter:image" content="/images/share-card.png" />
```

## 🔄 Atualização Automática

### **Como Funciona:**
1. **Substitui arquivo:** `share-card.png`
2. **Deploy automático:** Vercel atualiza
3. **Cache limpo:** Redes sociais detectam nova imagem
4. **Compartilhamento:** Nova imagem aparece

### **Timeline:**
- **Imediato:** Site atualizado
- **24h:** PWA instalado atualizado
- **1-7 dias:** Redes sociais atualizam cache

## ✅ Checklist Final

- [ ] Gerar imagem com fundo preto
- [ ] Logo dourado centralizado
- [ ] Texto legível e sem cortes
- [ ] Dimensões 1200x630 pixels
- [ ] Salvar como `share-card.png`
- [ ] Colocar em `public/images/`
- [ ] Fazer commit e push
- [ ] Testar compartilhamento

## 🚀 Deploy

Após gerar e substituir a imagem:
1. **Commit:** `git add . && git commit -m "atualizada imagem de compartilhamento"`
2. **Push:** `git push origin master`
3. **Vercel:** Deploy automático
4. **Teste:** Compartilhar link do cartão digital

## 📱 Teste de Compartilhamento

### **WhatsApp:**
1. Abra o cartão digital
2. Clique em "Compartilhar"
3. Escolha WhatsApp
4. Verifique se a imagem aparece corretamente

### **Instagram:**
1. Abra o cartão digital
2. Clique em "Compartilhar"
3. Escolha Instagram
4. Verifique se a imagem aparece corretamente

### **Resultado Esperado:**
- ✅ **Fundo preto sólido**
- ✅ **Logo dourado visível**
- ✅ **Texto legível**
- ✅ **Sem cortes ou distorções**
