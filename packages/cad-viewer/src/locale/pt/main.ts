export default {
  mainMenu: {
    new: 'Novo Desenho',
    open: 'Abrir Desenho',
    drawingUnits: 'Unidades do Desenho',
    export: 'Exportar para DXF',
    exportHtml: 'Exportar para HTML',
    exportPdf: 'Exportar para PDF',
    exportSvg: 'Exportar para SVG',
    exportImage: 'Exportar para Imagem'
  },
  ribbon: {
    tab: {
      home: 'Início',
      tools: 'Ferramentas',
      hatchContext: 'Hachura',
      mtextEditorContext: 'Editor de Texto'
    },
    hatch: {
      group: {
        boundary: 'Contornos',
        pattern: 'Padrão',
        properties: 'Propriedades',
        options: 'Opções',
        close: 'Fechar'
      },
      command: {
        pickPoints: 'Selecionar Pontos',
        selectObjects: 'Selecionar Objetos',
        close: 'Fechar'
      },
      field: {
        pattern: 'Padrão',
        scale: 'Escala',
        angle: 'Ângulo',
        style: 'Estilo',
        associative: 'Associativo',
        fillType: 'Tipo de Preenchimento',
        fillColor: 'Cor',
        patternColor: 'Cor do Padrão',
        gradient1Color: 'Cor do Gradiente 1',
        backgroundColor: 'Cor de Fundo',
        gradient2Color: 'Cor do Gradiente 2',
        opacity: 'Transparência',
        imageScale: 'Escala da Imagem'
      },
      style: {
        normal: 'Normal',
        outer: 'Externo',
        ignore: 'Ignorar'
      },
      fillType: {
        solid: 'Sólido',
        pattern: 'Padrão',
        gradient: 'Gradiente'
      },
      associative: {
        on: 'Ativo',
        off: 'Inativo'
      },
      tooltip: {
        pickPoints: 'Selecione pontos internos para criar regiões de hachura.',
        selectObjects: 'Selecione objetos de contorno fechado para hachurar.',
        pattern: 'Escolha o nome do padrão de hachura.',
        scale: 'Defina a escala do padrão de hachura.',
        angle: 'Defina o ângulo do padrão de hachura em graus.',
        style: 'Controle o estilo de detecção de ilhas na criação de hachura.',
        associative: 'Ativar ou desativar o modo de hachura associativa.',
        fillType: 'Selecione o tipo de preenchimento: sólido, padrão ou gradiente.',
        fillColor: 'Escolha a cor de preenchimento.',
        patternColor: 'Escolha a cor das linhas do padrão.',
        gradient1Color: 'Escolha a primeira cor do gradiente.',
        backgroundColor: 'Escolha a cor de fundo para preenchimento com padrão.',
        gradient2Color: 'Escolha a segunda cor do gradiente.',
        opacity: 'Defina a transparência da hachura (0-90).',
        imageScale: 'Defina a escala da imagem de preenchimento.',
        close: 'Sair da criação de Hachura e fechar esta aba contextual.'
      }
    },
    mtext: {
      group: {
        textStyle: 'Estilo de Texto',
        format: 'Formato',
        paragraph: 'Parágrafo',
        insert: 'Inserir',
        close: 'Fechar'
      },
      field: {
        textStyle: 'Estilo de Texto',
        font: 'Fonte',
        color: 'Cor',
        height: 'Altura',
        obliqueAngle: 'Ângulo oblíquo',
        tracking: 'Espaçamento',
        widthFactor: 'Fator de largura'
      },
      characterMap: {
        title: 'Mapa de Caracteres',
        font: 'Fonte(F):',
        charsToCopy: 'Caracteres para copiar(A):',
        select: 'Selecionar(S)',
        copy: 'Copiar(C)',
        noGlyphs: 'Nenhum caractere disponível para esta fonte.',
        copyFailed: 'Não foi possível copiar para a área de transferência.'
      },
      command: {
        bold: 'Negrito',
        underline: 'Sublinhado',
        superscript: 'Sobrescrito',
        italic: 'Itálico',
        overline: 'Sobrelinhas',
        subscript: 'Subscrito',
        strikethrough: 'Tachado',
        stack: 'Empilhar',
        toggleCase: 'Maiúscula/Minúscula',
        attachment: 'Justificar',
        list: 'Marcadores e Numeração',
        lineSpacing: 'Espaçamento entre Linhas',
        paragraphAlignment: 'Alinhamento de Parágrafo',
        symbol: 'Símbolo',
        close: 'Fechar'
      },
      tooltip: {
        textStyle: 'Escolha um estilo de texto do desenho atual.',
        bold: 'Ativar ou desativar formatação em negrito.',
        underline: 'Ativar ou desativar formatação sublinhada.',
        superscript: 'Ativar ou desativar formatação sobrescrita.',
        italic: 'Ativar ou desativar formatação em itálico.',
        overline: 'Ativar ou desativar formatação com sobrelinha.',
        subscript: 'Ativar ou desativar formatação subscrita.',
        strikethrough: 'Ativar ou desativar formatação tachada.',
        stack: 'Empilhar ou desempilhar o texto de fração selecionado.',
        toggleCase: 'Alternar o texto selecionado entre maiúsculas e minúsculas.',
        font: 'Definir a fonte do texto atual.',
        color: 'Definir a cor do texto atual.',
        height: 'Definir a altura do texto atual. Valores personalizados são permitidos.',
        obliqueAngle:
          'Definir o ângulo de inclinação em graus para os caracteres selecionados (negativo inclina para o outro lado).',
        tracking:
          'Aumentar ou diminuir o espaçamento entre os caracteres selecionados (1 é o padrão).',
        widthFactor:
          'Esticar ou comprimir os caracteres selecionados horizontalmente (1 é o padrão).',
        attachment: 'Definir o ponto de fixação do texto multilinha.',
        list: 'Inserir ou configurar marcadores e numeração.',
        lineSpacing: 'Definir espaçamento entre linhas.',
        paragraphAlignment: 'Definir alinhamento horizontal do parágrafo.',
        symbol: 'Inserir um símbolo comum de desenho técnico.',
        close: 'Fechar o editor de texto e esta aba contextual.'
      },
      attachment: {
        TL: 'Superior Esquerdo',
        TC: 'Superior Centro',
        TR: 'Superior Direito',
        ML: 'Médio Esquerdo',
        MC: 'Médio Centro',
        MR: 'Médio Direito',
        BL: 'Inferior Esquerdo',
        BC: 'Inferior Centro',
        BR: 'Inferior Direito'
      },
      list: {
        off: 'Desativar',
        number: 'Numerado',
        letter: 'Com Letras',
        bullet: 'Com Marcadores',
        start: 'Iniciar',
        continue: 'Continuar',
        auto: 'Permitir Marcadores e Numeração Automáticos',
        allowList: 'Permitir Marcadores e Listas'
      },
      lineSpacing: {
        more: 'Mais...',
        clear: 'Limpar Espaçamento de Parágrafo'
      },
      paragraphAlign: {
        default: 'Padrão',
        left: 'Esquerda',
        center: 'Centro',
        right: 'Direita',
        justified: 'Justificado',
        distributed: 'Distribuído'
      },
      symbol: {
        degree: 'Graus  %%d',
        plusMinus: 'Mais/Menos  %%p',
        diameter: 'Diâmetro  %%c',
        almostEqual: 'Aproximadamente Igual  \\U+2248',
        angle: 'Ângulo  \\U+2220',
        boundary: 'Linha de Contorno  \\U+E100',
        centerLine: 'Linha de Centro  \\U+2104',
        delta: 'Delta  \\U+0394',
        electricalPhase: 'Fase Elétrica  \\U+0278',
        flowLine: 'Linha de Fluxo  \\U+E101',
        identical: 'Idêntico a  \\U+2261',
        notEqual: 'Diferente de  \\U+2260',
        ohm: 'Ohm  \\U+2126',
        omega: 'Ômega  \\U+03A9',
        propertyLine: 'Linha de Propriedade  \\U+214A',
        subscriptTwo: 'Subscrito 2  \\U+2082',
        squared: 'Quadrado  \\U+00B2',
        cubed: 'Cúbico  \\U+00B3',
        nbsp: 'Espaço Não Quebrável Ctrl+Shift+Espaço',
        other: 'Outro...'
      }
    },
    group: {
      draw: 'Desenhar',
      modify: 'Modificar',
      layer: 'Camada',
      properties: 'Propriedades',
      utilities: 'Utilitários',
      annotation: 'Anotação',
      measurement: 'Medição'
    },
    property: {
      color: 'Cor',
      lineType: 'Tipo de Linha',
      lineWeight: 'Espessura de Linha'
    },
    layerTools: {
      select: 'Camada',
      off: 'Desligar Camada',
      isolate: 'Isolar',
      freeze: 'Congelar Camada',
      lock: 'Bloquear Camada',
      current: 'Definir como Atual',
      allOn: 'Ligar Camada',
      unisolate: 'Desisolar',
      thaw: 'Descongelar Camada',
      unlock: 'Desbloquear Camada',
      restore: 'Restaurar Camada'
    },
    arc: {
      threePoint: '3 Pontos',
      startCenterEnd: 'Início, Centro, Fim',
      startCenterAngle: 'Início, Centro, Ângulo',
      startCenterLength: 'Início, Centro, Comprimento',
      startEndAngle: 'Início, Fim, Ângulo',
      startEndDirection: 'Início, Fim, Direção',
      startEndRadius: 'Início, Fim, Raio',
      centerStartEnd: 'Centro, Início, Fim',
      centerStartAngle: 'Centro, Início, Ângulo',
      centerStartLength: 'Centro, Início, Comprimento'
    },
    circle: {
      centerRadius: 'Centro, Raio',
      centerDiameter: 'Centro, Diâmetro',
      twoPoint: '2 Pontos',
      threePoint: '3 Pontos',
      tanTanRadius: 'Tan, Tan, Raio',
      tanTanTan: 'Tan, Tan, Tan'
    },
    ellipse: {
      ellipse: 'Elipse',
      arc: 'Arco Elíptico'
    },
    tooltip: {
      line: 'Desenhar um segmento de linha reta.',
      polyline: 'Desenhar uma série de segmentos de linha ou arco conectados como um único objeto.',
      spline: 'Desenhar uma curva spline suave por pontos de ajuste ou controle.',
      circle: 'Desenhar um círculo com vários métodos de construção.',
      arc: 'Desenhar um arco com vários métodos de construção.',
      mline: 'Desenhar múltiplas linhas paralelas como um único objeto multilinha.',
      ray: 'Desenhar um raio de construção semi-infinito a partir de um ponto inicial.',
      xline: 'Desenhar uma linha de construção infinita.',
      ellipse: 'Desenhar uma elipse ou arco elíptico.',
      rect: 'Desenhar um retângulo ou polígono regular.',
      point: 'Inserir um objeto de ponto no desenho.',
      hatch: 'Preencher uma área fechada com um padrão de hachura.',
      text: 'Criar anotações de texto multilinha no desenho.',
      move: 'Mover os objetos selecionados para uma nova posição.',
      rotate: 'Girar os objetos selecionados em torno de um ponto base.',
      copy: 'Copiar os objetos selecionados para um novo local.',
      erase: 'Excluir os objetos selecionados do desenho.',
      offset: 'Criar uma cópia paralela de um objeto a uma distância especificada.',
      properties: 'Abrir a paleta de Propriedades para a seleção atual.',
      quickSelect: 'Abrir Seleção Rápida para filtrar e selecionar entidades por critérios.',
      drawingUnits:
        'Abrir Unidades do Desenho para definir formatos de coordenadas, precisão e escala de inserção.',
      propertyColor: 'Definir a cor para os objetos recém-criados ou entidades selecionadas.',
      propertyLineType:
        'Definir o tipo de linha para os objetos recém-criados ou entidades selecionadas.',
      propertyLineWeight:
        'Definir a espessura de linha para os objetos recém-criados ou entidades selecionadas.',
      layerAction: {
        off: 'Desliga a camada selecionada para que seus objetos fiquem ocultos sem congelar a camada.',
        isolate:
          'Exibe apenas a camada selecionada e oculta as demais para que você possa se concentrar nos objetos relacionados.',
        freeze:
          'Congela a camada selecionada para que seus objetos fiquem ocultos e ignorados durante a regeneração.',
        lock: 'Bloqueia a camada selecionada para que seus objetos permaneçam visíveis, mas não possam ser editados.',
        current:
          'Define a camada selecionada como atual para que novos objetos sejam criados nessa camada.',
        allOn:
          'Liga todas as camadas que estão desligadas. As camadas congeladas permanecem congeladas.',
        unisolate:
          'Restaura as camadas ocultas ou bloqueadas pelo Isolar Camada, mantendo as alterações posteriores.',
        thaw: 'Descongela a camada selecionada para que seus objetos fiquem visíveis e incluídos na regeneração novamente.',
        unlock:
          'Desbloqueia a camada selecionada para que seus objetos possam ser selecionados e modificados novamente.',
        restore:
          'Restaura o estado anterior da camada a partir da ação de camada mais recente nesta faixa de opções.'
      },
      circleOption: {
        centerRadius: 'Criar um círculo especificando um ponto central e um raio.',
        centerDiameter: 'Criar um círculo especificando um ponto central e um diâmetro.',
        twoPoint: 'Criar um círculo cujo diâmetro é definido por dois pontos.',
        threePoint: 'Criar um círculo que passa por três pontos.',
        tanTanRadius: 'Criar um círculo tangente a dois objetos com um raio especificado.',
        tanTanTan: 'Criar um círculo tangente a três objetos.'
      },
      arcOption: {
        threePoint: 'Criar um arco que passa por um ponto inicial, um segundo ponto e um ponto final.',
        startCenterEnd:
          'Criar um arco especificando um ponto inicial, ponto central e ponto final.',
        startCenterAngle:
          'Criar um arco usando um ponto inicial, ponto central e ângulo incluído.',
        startCenterLength:
          'Criar um arco usando um ponto inicial, ponto central e comprimento do arco.',
        startEndAngle: 'Criar um arco a partir dos pontos inicial e final com um ângulo incluído.',
        startEndDirection:
          'Criar um arco a partir dos pontos inicial e final com uma direção tangente no ponto inicial.',
        startEndRadius:
          'Criar um arco a partir dos pontos inicial e final com um raio especificado.',
        centerStartEnd:
          'Criar um arco especificando um ponto central, ponto inicial e ponto final.',
        centerStartAngle:
          'Criar um arco especificando um ponto central, ponto inicial e ângulo incluído.',
        centerStartLength:
          'Criar um arco especificando um ponto central, ponto inicial e comprimento do arco.'
      },
      rectOption: {
        rectangle: 'Criar um retângulo especificando cantos opostos ou dimensões.',
        polygon:
          'Criar um polígono regular especificando o número de lados e o método de construção.'
      },
      ellipseOption: {
        ellipse: 'Criar uma elipse completa especificando os eixos maior e menor.',
        arc: 'Criar um arco elíptico especificando os eixos da elipse e os limites do arco.'
      }
    },
    command: {
      line: 'Linha',
      polyline: 'Polilinha',
      circle: 'Círculo',
      arc: 'Arco',
      mline: 'Multilinha',
      ray: 'Raio',
      xline: 'Linha Infinita',
      ellipse: 'Elipse',
      spline: 'Spline',
      rect: 'Ret',
      rectangle: 'Retângulo',
      polygon: 'Polígono',
      point: 'Ponto',
      divide: 'Dividir',
      hatch: 'Hachura',
      text: 'Texto',
      gradient: 'Gradiente',
      move: 'Mover',
      rotate: 'Girar',
      copy: 'Copiar',
      erase: 'Apagar',
      offset: 'Deslocar',
      properties: 'Propriedades',
      quickSelect: 'Seleção Rápida',
      drawingUnits: 'Unidades do Desenho'
    }
  },
  verticalToolbar: {
    measure: {
      text: 'Medir',
      description: 'Ferramentas de medição'
    },
    measureDistance: {
      text: 'Distância',
      description: 'Mede a distância entre dois pontos'
    },
    measureAngle: {
      text: 'Ângulo',
      description: 'Mede o ângulo entre duas linhas com um vértice comum'
    },
    measureArea: {
      text: 'Área',
      description: 'Mede a área de um polígono'
    },
    measureArc: {
      text: 'Arco',
      description: 'Mede o comprimento de um arco definido por três pontos'
    },
    clearMeasurements: {
      text: 'Limpar',
      description: 'Remove todas as medições ativas da vista'
    },
    annotation: {
      text: 'Anotação',
      description: 'Cria anotações de texto ou gráficas para explicar e marcar o conteúdo do desenho'
    },
    hideAnnotation: {
      text: 'Ocultar',
      description: 'Oculta as anotações'
    },
    layer: {
      text: 'Camada',
      description: 'Gerencia camadas'
    },
    pan: {
      text: 'Panorâmica',
      description: 'Desloca a vista sem alterar a direção ou ampliação'
    },
    revCircle: {
      text: 'Círculo',
      description: 'Usa círculos para destacar e anotar áreas no desenho'
    },
    revLine: {
      text: 'Linha',
      description: 'Usa linhas retas para anotar e explicar objetos ou áreas no desenho'
    },
    revFreehand: {
      text: 'À Mão Livre',
      description: 'Usa traços à mão livre para anotar e enfatizar o conteúdo do desenho'
    },
    revRect: {
      text: 'Retângulo',
      description: 'Usa retângulos para destacar e anotar objetos ou áreas no desenho'
    },
    revCloud: {
      text: 'Nuvem de Rev.',
      description: 'Usado para destacar áreas no desenho com um contorno em forma de nuvem'
    },
    select: {
      text: 'Selecionar',
      description: 'Seleciona entidades'
    },
    showAnnotation: {
      text: 'Exibir',
      description: 'Exibe as anotações'
    },
    switchBg: {
      text: 'Alternar',
      description: 'Alterna o fundo do desenho entre branco e preto'
    },
    zoomToExtent: {
      text: 'Zoom Total',
      description: 'Aplica zoom para exibir a extensão máxima de todas as entidades'
    },
    zoomToBox: {
      text: 'Janela de Zoom',
      description: 'Aplica zoom para exibir uma área especificada por uma janela retangular'
    }
  },
  statusBar: {
    setting: {
      tooltip: 'Configurações de Exibição',
      commandLine: 'Linha de Comando',
      coordinate: 'Coordenada',
      entityInfo: 'Informações da Entidade',
      fileName: 'Nome do Arquivo',
      languageSelector: 'Seletor de Idioma',
      mainMenu: 'Menu Principal',
      toolbar: 'Barra de Ferramentas',
      stats: 'Estatísticas'
    },
    osnap: {
      tooltip: 'Snap de Objeto',
      endpoint: 'Extremidade',
      midpoint: 'Ponto Médio',
      center: 'Centro',
      node: 'Nó',
      quadrant: 'Quadrante',
      insertion: 'Inserção',
      nearest: 'Próximo'
    },
    pointStyle: {
      tooltip: 'Modificar estilo de ponto'
    },
    fullScreen: {
      on: 'Desativar modo tela cheia',
      off: 'Ativar modo tela cheia'
    },
    dynamicInput: {
      on: 'Desativar entrada dinâmica',
      off: 'Ativar entrada dinâmica'
    },
    lineWidth: {
      on: 'Ocultar espessuras de linha',
      off: 'Exibir espessuras de linha'
    },
    theme: {
      dark: 'Mudar para tema claro',
      light: 'Mudar para tema escuro'
    },
    warning: {
      font: 'As seguintes fontes não foram encontradas!'
    },
    notification: {
      tooltip: 'Exibir notificações'
    },
    export: {
      tooltip: 'Exportar imagem como PNG'
    }
  },
  toolPalette: {
    entityProperties: {
      tab: 'Propriedades',
      title: 'Propriedades da Entidade',
      propertyPanel: {
        noEntitySelected: 'Nenhuma entidade selecionada!',
        multipleEntitySelected: '{count} entidades selecionadas',
        propValCopied: 'Valor da propriedade copiado',
        failedToCopyPropVal: 'Falha ao copiar valor da propriedade!'
      }
    },
    layerManager: {
      tab: 'Camadas',
      title: 'Gerenciador de Camadas',
      layerList: {
        name: 'Nome',
        on: 'Ativa',
        color: 'Cor',
        zoomToLayer: 'Zoom aplicado à camada clicada "{layer}"'
      }
    }
  },
  colorDropdown: {
    custom: 'Personalizado'
  },
  lineTypeSelect: {
    placeholder: 'Tipo de Linha'
  },
  colorIndexPicker: {
    color: 'Cor: ',
    colorIndex: 'Índice de Cor: ',
    inputPlaceholder: '0-256, PORCAMADA, PORBLOCO',
    rgb: 'RGB: '
  },
  entityInfo: {
    color: 'Cor',
    layer: 'Camada',
    lineType: 'Tipo de Linha'
  },
  ribbonProperty: {
    color: 'Cor',
    lineType: 'Tipo de Linha',
    lineWeight: 'Espessura de Linha',
    layer: 'Camada'
  },
  layerSelect: {
    searchPlaceholder: 'Pesquisar nome da camada',
    noLayerAvailable: 'Nenhuma camada disponível',
    noMatchedLayer: 'Nenhuma camada encontrada',
    tooltip: {
      layer: 'Camada',
      visibility: 'Visibilidade',
      freeze: 'Congelar',
      lock: 'Bloquear',
      lineType: 'Tipo de Linha',
      color: 'Cor',
      visible: 'Visível',
      hidden: 'Oculto',
      frozen: 'Congelado',
      thawed: 'Descongelado',
      locked: 'Bloqueado',
      unlocked: 'Desbloqueado'
    }
  },
  message: {
    loadingFonts: 'Carregando fontes ...',
    loadingDwgConverter: 'Carregando conversor DWG...',
    fontsNotFound: 'Fontes "{fonts}" não encontradas no repositório de fontes!',
    fontsNotLoaded: 'Fontes "{fonts}" não puderam ser carregadas!',
    failedToGetAvaiableFonts: 'Falha ao obter fontes disponíveis de "{url}"!',
    failedToOpenFile: 'Falha ao abrir o arquivo "{fileName}"!',
    fetchingDrawingFile: 'Buscando arquivo ...',
    unknownEntities:
      'Este desenho contém {count} entidades desconhecidas ou não suportadas! Essas entidades não serão exibidas.'
  },
  notification: {
    center: {
      title: 'Notificações',
      clearAll: 'Limpar Tudo',
      noNotifications: 'Sem notificações'
    },
    time: {
      justNow: 'Agora mesmo',
      minutesAgo: '{count} minuto atrás | {count} minutos atrás',
      hoursAgo: '{count} hora atrás | {count} horas atrás',
      daysAgo: '{count} dia atrás | {count} dias atrás'
    },
    title: {
      failedToOpenFile: 'Falha ao Abrir Arquivo',
      fontNotFound: 'Fonte Não Encontrada',
      fontNotLoaded: 'Fonte Não Carregada',
      parsingWarning: 'Problemas ao Processar Desenho'
    }
  }
}
