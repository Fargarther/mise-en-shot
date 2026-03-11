import { useState, useCallback, useMemo } from "react";

// ─── FULL STYLE LIBRARY: 1,200 styles with semantic tags ───
// Format: [id, name, categoryId, [subject, energy, distance, sense, editorial_role]]
const STYLES = [
  [1,"White chalk street lettering on dark pavement",1,["brand","medium","medium","audio","rhythm"]],
  [2,"Neon tube script traced over footage",1,["brand","medium","medium","visual","rhythm"]],
  [3,"Cursive ink bleed reveal",1,["brand","medium","medium","visual","opener"]],
  [4,"Condensation finger-writing on cold glass",1,["brand","medium","medium","tactile","rhythm"]],
  [5,"Salt pour lettering on dark bar top",1,["drink","medium","close","audio","rhythm"]],
  [6,"Gold leaf press-on lettering",1,["brand","medium","medium","audio","rhythm"]],
  [7,"Typewriter key strike animation",1,["brand","fast","medium","visual","rhythm"]],
  [8,"Flour dust lettering on cutting board",1,["brand","medium","medium","audio","transition"]],
  [9,"Smoke lettering dissipating into air",1,["brand","medium","medium","audio","rhythm"]],
  [10,"Grease pencil scrawl on butcher paper",1,["brand","slow","medium","visual","rhythm"]],
  [11,"Frost crystal forming into words on glass",1,["brand","medium","medium","tactile","rhythm"]],
  [12,"Matchstick burn lettering into wood",1,["brand","medium","medium","audio","transition"]],
  [13,"Ketchup squeeze-bottle script on white plate",1,["food","medium","medium","visual","payoff"]],
  [14,"Branded iron burn into wood plank",1,["brand","medium","medium","tactile","closer"]],
  [15,"Stencil spray paint on concrete",1,["brand","medium","medium","visual","rhythm"]],
  [16,"Cocktail napkin ballpoint pen handwriting",1,["drink","medium","medium","visual","rhythm"]],
  [17,"Embossed leather stamp lettering",1,["brand","medium","medium","audio","rhythm"]],
  [18,"Playing card suit symbols replacing letters",1,["brand","medium","medium","visual","rhythm"]],
  [19,"Marquee lightbulb letter reveal",1,["brand","medium","medium","visual","opener"]],
  [20,"Liquid pour lettering",1,["drink","medium","close","audio","rhythm"]],
  [21,"Knife-carved lettering into cutting board",1,["brand","medium","medium","audio","transition"]],
  [22,"Breath fog lettering on cold window",1,["brand","medium","medium","audio","texture"]],
  [23,"Dice arrangement spelling words",1,["brand","medium","medium","thermal","rhythm"]],
  [24,"Poker chip stack typography",1,["food","medium","medium","visual","rhythm"]],
  [25,"Receipt printer text scroll",1,["brand","medium","medium","visual","rhythm"]],
  [26,"Casino scoreboard flip-card lettering",1,["space","medium","medium","audio","rhythm"]],
  [27,"Scratched-into-frost lettering on beer mug",1,["drink","medium","medium","audio","rhythm"]],
  [28,"Menu board chalk lettering",1,["brand","medium","medium","audio","rhythm"]],
  [29,"Melting ice text",1,["brand","medium","medium","thermal","rhythm"]],
  [30,"Neon sign flicker-on text",1,["brand","medium","medium","visual","rhythm"]],
  [31,"Newspaper headline cut-and-paste",1,["space","medium","medium","visual","transition"]],
  [32,"Vintage ticket stub lettering",1,["brand","medium","medium","audio","rhythm"]],
  [33,"Fire lettering",1,["brand","medium","medium","audio","rhythm"]],
  [34,"Caramel drizzle cursive on dessert plate",1,["food","medium","close","visual","payoff"]],
  [35,"Embroidered thread lettering on napkin",1,["brand","medium","medium","audio","rhythm"]],
  [36,"Engraved crystal glass lettering",1,["brand","medium","medium","audio","rhythm"]],
  [37,"Vintage postcard hand-stamped lettering",1,["brand","medium","medium","audio","rhythm"]],
  [38,"Cocktail garnish arranged as letters",1,["drink","medium","close","visual","rhythm"]],
  [39,"Illuminated manuscript drop cap",1,["brand","medium","medium","visual","rhythm"]],
  [40,"Digital glitch text with scan line artifacts",1,["gear","medium","medium","visual","rhythm"]],
  [41,"Blueprint technical drawing lettering",1,["brand","medium","medium","audio","rhythm"]],
  [42,"Cork board push-pin letter arrangement",1,["brand","medium","medium","tactile","rhythm"]],
  [43,"Magnetic letter board cafe style",1,["brand","medium","medium","visual","rhythm"]],
  [44,"Etched mirror lettering vintage bar mirror",1,["space","medium","medium","audio","rhythm"]],
  [45,"Glow-in-the-dark UV paint lettering",1,["brand","medium","medium","audio","texture"]],
  [46,"Bead-of-water lettering on polished surface",1,["brand","medium","medium","audio","texture"]],
  [47,"Cracked leather embossed text",1,["brand","medium","close","audio","rhythm"]],
  [48,"Wooden block letter arrangement Scrabble style",1,["brand","medium","medium","tactile","rhythm"]],
  [49,"Laser-etched text on metal surface",1,["brand","medium","medium","tactile","texture"]],
  [50,"Candy letter mold typography",1,["brand","medium","medium","visual","rhythm"]],
  [51,"Dice roll reveal",2,["brand","medium","medium","thermal","opener"]],
  [52,"Playing card flip transition",2,["brand","medium","medium","motion","transition"]],
  [53,"Slot machine reel spin",2,["brand","medium","medium","motion","rhythm"]],
  [54,"Smoke clear reveal",2,["brand","medium","medium","visual","opener"]],
  [55,"Bottle cap pop transition",2,["brand","fast","medium","audio","transition"]],
  [56,"Cocktail shaker shake-and-pour reveal",2,["drink","medium","close","visual","opener"]],
  [57,"Door push-open reveal",2,["brand","medium","medium","visual","opener"]],
  [58,"Curtain pull reveal",2,["brand","medium","close","visual","opener"]],
  [59,"Menu flip reveal",2,["brand","medium","medium","motion","opener"]],
  [60,"Chip toss transition",2,["brand","medium","medium","motion","transition"]],
  [61,"Flame burst transition",2,["brand","fast","medium","thermal","transition"]],
  [62,"Ice crack reveal",2,["brand","medium","close","audio","opener"]],
  [63,"Napkin unfold reveal",2,["brand","medium","medium","visual","opener"]],
  [64,"Shot glass slam transition",2,["brand","fast","medium","tactile","transition"]],
  [65,"Elevator door open reveal",2,["brand","medium","medium","visual","opener"]],
  [66,"Beer tap pull transition",2,["drink","medium","close","visual","transition"]],
  [67,"Knife slice transition",2,["brand","medium","close","thermal","transition"]],
  [68,"Roulette wheel spin reveal",2,["brand","medium","medium","motion","opener"]],
  [69,"Tablecloth pull reveal",2,["brand","medium","close","visual","opener"]],
  [70,"Match strike transition",2,["brand","fast","medium","visual","transition"]],
  [71,"Polaroid develop reveal",2,["brand","medium","medium","visual","opener"]],
  [72,"Record needle drop transition",2,["brand","medium","medium","visual","transition"]],
  [73,"Oven door open reveal",2,["brand","medium","medium","visual","opener"]],
  [74,"Blindfold removal reveal",2,["brand","medium","medium","visual","opener"]],
  [75,"Confetti burst transition",2,["brand","fast","medium","visual","transition"]],
  [76,"Subway tile wipe",2,["brand","medium","medium","visual","transition"]],
  [77,"Water splash transition",2,["brand","medium","medium","visual","transition"]],
  [78,"Lens cap remove reveal",2,["brand","medium","medium","visual","opener"]],
  [79,"Pizza box lid open reveal",2,["food","medium","medium","visual","opener"]],
  [80,"Wallet open reveal",2,["brand","medium","medium","visual","opener"]],
  [81,"Zippo lighter open-and-light",2,["brand","medium","medium","visual","opener"]],
  [82,"Refrigerator door open reveal",2,["brand","medium","medium","visual","opener"]],
  [83,"Book page turn transition",2,["brand","medium","medium","visual","transition"]],
  [84,"Cocktail umbrella spin wipe",2,["drink","medium","medium","motion","transition"]],
  [85,"Domino fall chain reaction reveal",2,["people","medium","medium","visual","opener"]],
  [86,"Cork pop champagne spray",2,["drink","fast","medium","audio","rhythm"]],
  [87,"Salt shaker tilt pour wipe",2,["drink","medium","close","motion","transition"]],
  [88,"Window shade roll-up reveal",2,["brand","medium","medium","visual","opener"]],
  [89,"Casino chip stack collapse",2,["space","medium","medium","visual","rhythm"]],
  [90,"Card deal slide transition",2,["brand","medium","medium","motion","transition"]],
  [91,"Spinning tray reveal Lazy Susan",2,["brand","medium","medium","motion","opener"]],
  [92,"Steam lift reveal",2,["drink","medium","medium","thermal","opener"]],
  [93,"Drumstick hit cymbal crash",2,["brand","fast","medium","audio","rhythm"]],
  [94,"Check presenter open reveal",2,["brand","medium","medium","visual","opener"]],
  [95,"Wine decanter pour transition",2,["drink","medium","close","visual","transition"]],
  [96,"Ticket tear transition",2,["drink","medium","medium","visual","transition"]],
  [97,"Light switch flip transition",2,["brand","medium","medium","motion","transition"]],
  [98,"Morph cut between similar shapes",2,["brand","medium","medium","visual","transition"]],
  [99,"Finger snap transition",2,["brand","fast","medium","audio","transition"]],
  [100,"Candle blow-out transition",2,["brand","slow","medium","visual","transition"]],
  [101,"Overhead flat lay 90 top-down",3,["brand","medium","aerial","visual","rhythm"]],
  [102,"Hero angle 15-25 above",3,["brand","medium","medium","visual","payoff"]],
  [103,"Tabletop-level eye line",3,["brand","medium","medium","visual","rhythm"]],
  [104,"Extreme macro texture fill",3,["brand","medium","macro","tactile","texture"]],
  [105,"Dutch angle tilted frame",3,["brand","medium","medium","motion","rhythm"]],
  [106,"Worms eye view floor up",3,["brand","medium","medium","visual","rhythm"]],
  [107,"Orbit shot 360 gimbal circle",3,["brand","medium","medium","thermal","rhythm"]],
  [108,"Push-in dolly",3,["brand","medium","medium","motion","rhythm"]],
  [109,"Pull-back reveal dolly",3,["brand","medium","close","motion","opener"]],
  [110,"Vertical crane descent",3,["brand","medium","medium","visual","rhythm"]],
  [111,"Vertical crane ascent",3,["brand","medium","medium","visual","rhythm"]],
  [112,"Lateral slider track",3,["brand","medium","medium","motion","rhythm"]],
  [113,"Through-the-window shot",3,["brand","medium","medium","tactile","rhythm"]],
  [114,"Peekaboo shot through objects",3,["brand","medium","medium","tactile","rhythm"]],
  [115,"Follow shot trailing someone",3,["brand","medium","medium","thermal","rhythm"]],
  [116,"Leading shot ahead of subject",3,["brand","medium","medium","thermal","rhythm"]],
  [117,"Whip pan",3,["brand","fast","medium","motion","rhythm"]],
  [118,"Snap zoom",3,["brand","fast","medium","audio","rhythm"]],
  [119,"Rack focus pull FG to BG",3,["brand","medium","close","visual","rhythm"]],
  [120,"Rack focus push BG to FG",3,["brand","medium","medium","visual","rhythm"]],
  [121,"Split diopter",3,["brand","medium","medium","visual","rhythm"]],
  [122,"Tilt-shift miniature",3,["brand","medium","medium","motion","transition"]],
  [123,"Mirror reflection shot",3,["brand","medium","medium","thermal","rhythm"]],
  [124,"Silhouette framing",3,["brand","medium","medium","visual","rhythm"]],
  [125,"Over-the-shoulder toward guest",3,["people","medium","medium","visual","rhythm"]],
  [126,"POV shot first person guest",3,["people","medium","medium","thermal","opener"]],
  [127,"Overhead tracking following a plate",3,["food","medium","aerial","motion","payoff"]],
  [128,"Steadicam walk-and-talk",3,["drink","medium","medium","motion","rhythm"]],
  [129,"Low dolly along bar counter",3,["space","medium","medium","motion","rhythm"]],
  [130,"Crane-up from food to dining room",3,["food","medium","medium","visual","rhythm"]],
  [131,"Snorricam mounted to subject",3,["brand","medium","medium","visual","rhythm"]],
  [132,"Canted push-in",3,["brand","medium","medium","visual","rhythm"]],
  [133,"Parallax slide",3,["brand","medium","medium","motion","rhythm"]],
  [134,"Static locked-off",3,["brand","slow","medium","visual","rhythm"]],
  [135,"Handheld documentary",3,["brand","medium","medium","visual","rhythm"]],
  [136,"Circular dolly arc around table",3,["brand","medium","medium","motion","rhythm"]],
  [137,"Zoom crawl extremely slow zoom",3,["brand","slow","medium","visual","rhythm"]],
  [138,"Jib arm sweep",3,["brand","medium","wide","visual","rhythm"]],
  [139,"Doorway dolly through door into space",3,["space","medium","medium","tactile","rhythm"]],
  [140,"Under-glass shot looking up through table",3,["brand","medium","medium","tactile","rhythm"]],
  [141,"Bartenders POV",3,["people","medium","medium","visual","closer"]],
  [142,"Pass-through shot",3,["brand","medium","medium","tactile","rhythm"]],
  [143,"Vertigo dolly zoom",3,["brand","medium","medium","motion","rhythm"]],
  [144,"Two-shot composition",3,["brand","medium","medium","thermal","rhythm"]],
  [145,"Deep staging multiple depth planes",3,["brand","medium","medium","visual","rhythm"]],
  [146,"Negative space composition",3,["space","medium","medium","visual","rhythm"]],
  [147,"Centered symmetry",3,["brand","medium","medium","visual","rhythm"]],
  [148,"Edge-of-frame tension",3,["brand","medium","medium","visual","rhythm"]],
  [149,"Foreground bokeh frame",3,["brand","medium","medium","visual","rhythm"]],
  [150,"Layered depth rack 3 planes",3,["brand","medium","medium","visual","rhythm"]],
  [151,"Single candle illumination",4,["brand","slow","medium","visual","rhythm"]],
  [152,"Neon wash colored neon fills scene",4,["brand","medium","medium","visual","rhythm"]],
  [153,"Rim light silhouette",4,["brand","medium","medium","visual","rhythm"]],
  [154,"Chiaroscuro high contrast",4,["brand","medium","medium","visual","rhythm"]],
  [155,"Blacklight UV glow",4,["brand","medium","medium","visual","texture"]],
  [156,"Spotlight isolation",4,["brand","medium","medium","visual","rhythm"]],
  [157,"Backlit steam smoke",4,["drink","medium","medium","thermal","rhythm"]],
  [158,"Golden hour window light",4,["brand","medium","medium","visual","rhythm"]],
  [159,"Practical lights only venue fixtures",4,["space","medium","wide","visual","rhythm"]],
  [160,"Edison bulb warm glow",4,["brand","medium","medium","thermal","texture"]],
  [161,"Overhead pendant pool",4,["space","medium","aerial","visual","closer"]],
  [162,"Under-lit dramatic uplighting",4,["brand","medium","medium","visual","rhythm"]],
  [163,"Cross lighting two opposing sources",4,["brand","medium","medium","visual","rhythm"]],
  [164,"Butterfly lighting beauty style",4,["brand","medium","medium","motion","payoff"]],
  [165,"Rembrandt lighting triangle on cheek",4,["brand","medium","medium","visual","closer"]],
  [166,"Split lighting half lit half shadow",4,["brand","medium","medium","visual","rhythm"]],
  [167,"Colored gel wash",4,["brand","medium","medium","visual","rhythm"]],
  [168,"Bi-color gel split",4,["brand","medium","medium","visual","rhythm"]],
  [169,"Fairy light bokeh background",4,["brand","medium","medium","visual","texture"]],
  [170,"Strobe flash freeze",4,["brand","fast","medium","thermal","rhythm"]],
  [171,"Gobo pattern lighting",4,["brand","medium","medium","visual","texture"]],
  [172,"Diffused overcast simulation",4,["brand","medium","medium","visual","rhythm"]],
  [173,"Hard direct sunlight",4,["brand","medium","medium","visual","rhythm"]],
  [174,"Dappled light through foliage",4,["brand","medium","medium","tactile","rhythm"]],
  [175,"Fire light flicker",4,["brand","medium","medium","thermal","rhythm"]],
  [176,"Refrigerator door light",4,["brand","medium","medium","visual","rhythm"]],
  [177,"Bar back-glow backlit bottles",4,["space","medium","medium","visual","texture"]],
  [178,"Slot machine glow",4,["brand","medium","medium","visual","texture"]],
  [179,"Stage lighting sweep",4,["brand","medium","wide","visual","rhythm"]],
  [180,"Emergency exit sign glow accent",4,["brand","medium","medium","visual","texture"]],
  [181,"Candlelit reflection on glassware",4,["brand","slow","medium","tactile","rhythm"]],
  [182,"LED strip accent lighting",4,["brand","medium","medium","visual","rhythm"]],
  [183,"Tungsten vs daylight contrast",4,["brand","medium","medium","visual","rhythm"]],
  [184,"Flash-to-ambient transition",4,["brand","fast","medium","visual","transition"]],
  [185,"Light painting with phone screen",4,["brand","medium","medium","visual","rhythm"]],
  [186,"Chandelier overhead spread",4,["brand","medium","wide","visual","rhythm"]],
  [187,"Table lamp side glow",4,["brand","medium","medium","visual","texture"]],
  [188,"Projected pattern light",4,["brand","medium","medium","visual","texture"]],
  [189,"Backlit menu sign glow",4,["brand","medium","medium","visual","texture"]],
  [190,"Neon reflection on wet surface",4,["brand","medium","medium","visual","texture"]],
  [191,"Headlight sweep cars outside",4,["brand","medium","wide","visual","rhythm"]],
  [192,"Television screen glow",4,["brand","medium","medium","visual","texture"]],
  [193,"Lighter flick illumination",4,["brand","medium","medium","visual","rhythm"]],
  [194,"Pin light tiny focused beam",4,["brand","medium","medium","visual","rhythm"]],
  [195,"Moonlight simulation",4,["brand","medium","medium","visual","rhythm"]],
  [196,"Dawn dusk gradient",4,["brand","medium","medium","visual","opener"]],
  [197,"Mirror ball scatter",4,["brand","medium","medium","visual","rhythm"]],
  [198,"Flashlight search beam",4,["brand","fast","medium","visual","rhythm"]],
  [199,"Cooking flame glow gas burner",4,["people","medium","medium","thermal","texture"]],
  [200,"Window blinds stripe lighting",4,["brand","medium","medium","visual","rhythm"]],
  [201,"Stop motion assembly",5,["brand","medium","medium","motion","payoff"]],
  [202,"Reverse video",5,["brand","medium","medium","visual","rhythm"]],
  [203,"Slow motion hero pour",5,["drink","slow","close","motion","payoff"]],
  [204,"Hyperlapse walk-through",5,["brand","fast","medium","tactile","rhythm"]],
  [205,"Speed ramp slow-to-fast",5,["brand","slow","medium","visual","rhythm"]],
  [206,"Infinite zoom",5,["brand","medium","medium","visual","rhythm"]],
  [207,"Time-lapse prep to plate",5,["food","fast","medium","visual","payoff"]],
  [208,"Freeze frame with graphics",5,["brand","medium","medium","thermal","rhythm"]],
  [209,"Phantom slow-mo 1000fps",5,["brand","slow","medium","visual","rhythm"]],
  [210,"Strobe staccato",5,["brand","fast","medium","visual","rhythm"]],
  [211,"Bullet time frozen orbit",5,["brand","medium","medium","motion","rhythm"]],
  [212,"Day-to-night time-lapse",5,["brand","fast","medium","visual","closer"]],
  [213,"Cooking process time-lapse",5,["people","fast","medium","visual","rhythm"]],
  [214,"Crowd fill time-lapse",5,["people","fast","medium","visual","rhythm"]],
  [215,"Reverse speed ramp",5,["brand","fast","medium","visual","rhythm"]],
  [216,"Frame rate mismatch dreamy stutter",5,["brand","medium","medium","visual","transition"]],
  [217,"Long exposure light trails",5,["brand","medium","medium","visual","rhythm"]],
  [218,"Interval composite motion path",5,["brand","medium","medium","motion","rhythm"]],
  [219,"Ping-pong loop forward-reverse",5,["brand","medium","medium","visual","rhythm"]],
  [220,"Match-cut time skip",5,["brand","medium","medium","visual","transition"]],
  [221,"Speed ramped orbit",5,["brand","fast","medium","motion","rhythm"]],
  [222,"Rhythmic stop-motion on beat",5,["brand","fast","medium","audio","rhythm"]],
  [223,"Claymation-style stop motion",5,["brand","medium","medium","motion","rhythm"]],
  [224,"Paper cutout stop motion",5,["brand","medium","medium","motion","transition"]],
  [225,"Puppet object animation",5,["brand","medium","medium","visual","rhythm"]],
  [226,"Acceleration zoom",5,["brand","medium","medium","visual","rhythm"]],
  [227,"Deceleration reveal",5,["brand","medium","medium","visual","opener"]],
  [228,"Split-screen time comparison",5,["brand","medium","medium","visual","rhythm"]],
  [229,"Ghost trail effect",5,["people","medium","medium","visual","rhythm"]],
  [230,"Stutter step repeat frames",5,["brand","medium","medium","visual","rhythm"]],
  [231,"Rewind scrub",5,["brand","medium","medium","visual","rhythm"]],
  [232,"Multi-speed montage",5,["brand","fast","medium","visual","rhythm"]],
  [233,"Frozen crowd one moving element",5,["people","medium","medium","visual","rhythm"]],
  [234,"Real-time unbroken take",5,["brand","medium","medium","visual","rhythm"]],
  [235,"Time-slice photography",5,["brand","medium","close","thermal","rhythm"]],
  [236,"Ripple time effect",5,["brand","medium","medium","visual","rhythm"]],
  [237,"Step-printed slow motion",5,["brand","slow","medium","motion","rhythm"]],
  [238,"Snappy keyframe animation",5,["brand","fast","medium","audio","rhythm"]],
  [239,"Slow-mo food toss",5,["food","slow","medium","motion","rhythm"]],
  [240,"Kitchen timer countdown",5,["space","medium","medium","visual","rhythm"]],
  [241,"Cocktail build in reverse slow-mo",5,["drink","slow","medium","visual","payoff"]],
  [242,"Fast-forward service montage",5,["brand","fast","medium","thermal","rhythm"]],
  [243,"Clock hands spinning overlay",5,["brand","medium","medium","motion","texture"]],
  [244,"Pour-speed comparison",5,["drink","medium","close","visual","rhythm"]],
  [245,"Beat-synced speed changes",5,["brand","fast","medium","audio","transition"]],
  [246,"Stop-motion flatlay ingredient parade",5,["food","medium","wide","motion","rhythm"]],
  [247,"Growth time-lapse bread rising herbs",5,["food","fast","medium","visual","rhythm"]],
  [248,"Crowd energy pulse speed ramp to bass",5,["people","fast","medium","visual","rhythm"]],
  [249,"Seamless loop",5,["brand","medium","medium","visual","rhythm"]],
  [250,"Dolly time-lapse",5,["brand","fast","medium","motion","rhythm"]],
  [251,"Felt table green overlay",6,["brand","medium","medium","tactile","texture"]],
  [252,"Butcher paper background",6,["brand","medium","medium","visual","texture"]],
  [253,"Marble countertop texture",6,["brand","medium","medium","tactile","texture"]],
  [254,"Casino carpet pattern overlay",6,["space","medium","medium","visual","texture"]],
  [255,"Playing card back pattern",6,["brand","medium","medium","visual","texture"]],
  [256,"Linen tablecloth texture",6,["brand","medium","medium","tactile","texture"]],
  [257,"Reclaimed wood plank background",6,["brand","medium","medium","tactile","texture"]],
  [258,"Chalkboard surface layer",6,["brand","medium","medium","visual","texture"]],
  [259,"Hammered copper bar top",6,["space","medium","medium","tactile","rhythm"]],
  [260,"Leather booth texture",6,["space","medium","medium","tactile","texture"]],
  [261,"Stainless steel kitchen surface",6,["space","medium","medium","visual","texture"]],
  [262,"Terrazzo floor pattern",6,["brand","medium","medium","visual","texture"]],
  [263,"Red velvet curtain",6,["brand","medium","medium","tactile","rhythm"]],
  [264,"Exposed brick wall",6,["brand","medium","medium","visual","rhythm"]],
  [265,"Tile mosaic pattern",6,["brand","medium","medium","visual","texture"]],
  [266,"Condensation-covered glass",6,["brand","medium","medium","tactile","rhythm"]],
  [267,"Newspaper print background",6,["space","medium","medium","visual","texture"]],
  [268,"Vintage wallpaper pattern",6,["brand","medium","medium","visual","texture"]],
  [269,"Kraft paper wrapping",6,["brand","medium","medium","visual","rhythm"]],
  [270,"Menu parchment texture",6,["brand","medium","medium","tactile","texture"]],
  [271,"Cocktail napkin weave",6,["drink","medium","medium","tactile","rhythm"]],
  [272,"Charred blackened wood",6,["brand","medium","medium","tactile","rhythm"]],
  [273,"Polished granite surface",6,["brand","medium","medium","visual","texture"]],
  [274,"Woven placemat texture",6,["brand","medium","medium","tactile","texture"]],
  [275,"Pressed tin ceiling tile",6,["brand","medium","medium","visual","rhythm"]],
  [276,"Vinyl record surface grooves",6,["brand","medium","medium","visual","texture"]],
  [277,"Casino chip ribbed edge",6,["space","medium","medium","visual","rhythm"]],
  [278,"Cork surface",6,["brand","medium","medium","tactile","texture"]],
  [279,"Frosted glass texture",6,["brand","medium","medium","tactile","texture"]],
  [280,"Brushed metal",6,["brand","medium","medium","tactile","rhythm"]],
  [281,"Smoke haze layer",6,["brand","medium","medium","visual","texture"]],
  [282,"Rain-on-window overlay",6,["brand","medium","medium","visual","texture"]],
  [283,"Burlap hessian grain",6,["brand","medium","medium","tactile","texture"]],
  [284,"Concrete cement raw surface",6,["brand","medium","medium","visual","texture"]],
  [285,"Terrycloth bar towel",6,["space","medium","medium","visual","rhythm"]],
  [286,"Honeycomb pattern",6,["brand","medium","medium","visual","texture"]],
  [287,"Basket weave",6,["brand","medium","medium","tactile","rhythm"]],
  [288,"Sandstone rough surface",6,["brand","medium","medium","tactile","texture"]],
  [289,"Worn leather wallet",6,["brand","medium","medium","tactile","rhythm"]],
  [290,"Playing card felt poker table close-up",6,["food","medium","close","tactile","rhythm"]],
  [291,"Denim weave texture",6,["brand","medium","medium","tactile","texture"]],
  [292,"Vintage paper aged parchment",6,["brand","medium","medium","visual","rhythm"]],
  [293,"Water ripple surface",6,["brand","medium","medium","visual","texture"]],
  [294,"Carbon fiber pattern",6,["brand","medium","medium","visual","texture"]],
  [295,"Herringbone wood floor",6,["brand","medium","medium","audio","rhythm"]],
  [296,"Ceramic glaze crackle",6,["brand","medium","close","audio","rhythm"]],
  [297,"Slate cheese board",6,["food","medium","medium","tactile","rhythm"]],
  [298,"Wax seal texture",6,["brand","medium","medium","tactile","texture"]],
  [299,"Glass bottle ribbing",6,["brand","medium","medium","tactile","rhythm"]],
  [300,"Embossed wallpaper damask",6,["brand","medium","medium","visual","rhythm"]],
  [301,"Cheese pull stretch",7,["food","medium","close","visual","rhythm"]],
  [302,"Sizzle on hot surface",7,["food","medium","medium","audio","texture"]],
  [303,"Flame burst flambe",7,["food","fast","medium","thermal","rhythm"]],
  [304,"Ice crack into glass",7,["food","medium","close","audio","rhythm"]],
  [305,"Dice bounce and tumble",7,["food","medium","medium","thermal","rhythm"]],
  [306,"Card deal slide",7,["food","medium","medium","motion","rhythm"]],
  [307,"Cocktail layer pour",7,["drink","medium","close","visual","rhythm"]],
  [308,"Champagne cork pop with spray",7,["drink","fast","medium","audio","rhythm"]],
  [309,"Pepper grinder crack",7,["food","medium","close","audio","rhythm"]],
  [310,"Salt bae sprinkle",7,["food","medium","medium","visual","rhythm"]],
  [311,"Smoke gun burst cocktail",7,["drink","fast","medium","visual","rhythm"]],
  [312,"Torch brulee caramelization",7,["food","medium","medium","visual","rhythm"]],
  [313,"Bottle spin on bar",7,["food","medium","medium","motion","rhythm"]],
  [314,"Beer foam overflow",7,["drink","medium","medium","visual","rhythm"]],
  [315,"Knife cut through",7,["food","medium","medium","tactile","transition"]],
  [316,"Citrus zest spray",7,["food","medium","close","visual","rhythm"]],
  [317,"Garnish drop into cocktail",7,["drink","medium","close","visual","rhythm"]],
  [318,"Powder dusting sugar cocoa flour",7,["food","medium","medium","visual","rhythm"]],
  [319,"Gravy sauce pour",7,["food","medium","close","visual","rhythm"]],
  [320,"Skewer slide through",7,["food","medium","medium","tactile","rhythm"]],
  [321,"Chip shuffle poker chip riffle",7,["food","medium","medium","visual","rhythm"]],
  [322,"Napkin flip snap",7,["food","fast","medium","audio","rhythm"]],
  [323,"Whiskey pour over ice",7,["drink","medium","close","thermal","rhythm"]],
  [324,"Egg crack and drop",7,["food","medium","close","audio","rhythm"]],
  [325,"Dough stretch pull",7,["food","medium","close","visual","rhythm"]],
  [326,"Coffee crema swirl",7,["drink","medium","medium","visual","rhythm"]],
  [327,"Honey drizzle thread",7,["food","medium","close","visual","rhythm"]],
  [328,"Caramel string pull",7,["food","medium","close","audio","rhythm"]],
  [329,"Chocolate temper pour",7,["drink","medium","close","visual","rhythm"]],
  [330,"Herb chiffonade rapid knife work",7,["food","fast","medium","visual","rhythm"]],
  [331,"Oyster shuck pop",7,["food","fast","medium","audio","rhythm"]],
  [332,"Lobster claw crack",7,["food","medium","close","audio","rhythm"]],
  [333,"Wine cork twist-and-pull",7,["drink","medium","close","tactile","rhythm"]],
  [334,"Pint glass condensation drip",7,["food","medium","medium","tactile","rhythm"]],
  [335,"Pretzel salt toss",7,["food","medium","medium","motion","rhythm"]],
  [336,"Cream whip peak formation",7,["food","fast","medium","motion","rhythm"]],
  [337,"Grinder pepper mill cloud",7,["food","medium","medium","visual","rhythm"]],
  [338,"Bread tear-apart steam release",7,["food","medium","medium","thermal","rhythm"]],
  [339,"Cocktail muddling",7,["drink","medium","medium","visual","rhythm"]],
  [340,"Ice sculpture chip-away",7,["food","medium","medium","thermal","payoff"]],
  [341,"Meat thermometer probe insert",7,["food","medium","medium","visual","rhythm"]],
  [342,"Pasta twirl on fork",7,["food","medium","medium","visual","rhythm"]],
  [343,"Cheese wheel crack-open",7,["food","medium","close","audio","opener"]],
  [344,"Pan sauce deglaze",7,["food","medium","medium","motion","rhythm"]],
  [345,"Sushi rice press and shape",7,["food","medium","medium","thermal","rhythm"]],
  [346,"Cocktail flame float",7,["drink","medium","medium","thermal","rhythm"]],
  [347,"Creme anglaise river pour",7,["drink","medium","close","visual","rhythm"]],
  [348,"Espresso shot pull",7,["drink","medium","close","thermal","rhythm"]],
  [349,"Whipped butter curl",7,["brand","fast","close","motion","rhythm"]],
  [350,"Foam dissipation",7,["space","medium","medium","visual","rhythm"]],
  [351,"Sparkler ignition on dessert",7,["food","medium","medium","visual","rhythm"]],
  [352,"Dry ice fog from cocktail",7,["drink","medium","medium","thermal","texture"]],
  [353,"Confetti cannon burst",7,["food","fast","medium","visual","rhythm"]],
  [354,"Balloon pop reveal",7,["food","fast","medium","audio","opener"]],
  [355,"Playing cards thrown in air",7,["food","medium","medium","visual","rhythm"]],
  [356,"Domino chain topple",7,["food","medium","medium","visual","rhythm"]],
  [357,"Pool ball break shot",7,["space","medium","medium","thermal","rhythm"]],
  [358,"Cinnamon stick snap",7,["food","fast","medium","audio","rhythm"]],
  [359,"Sugar glass shatter",7,["food","medium","medium","tactile","rhythm"]],
  [360,"Flaming shot extinguish",7,["food","medium","medium","thermal","rhythm"]],
  [361,"Cherry stem tie garnish skill",7,["food","medium","close","visual","rhythm"]],
  [362,"Latte art pour",7,["drink","medium","close","visual","rhythm"]],
  [363,"Mussel shell open steam",7,["drink","medium","medium","thermal","opener"]],
  [364,"Popcorn kernel pop",7,["food","fast","medium","audio","rhythm"]],
  [365,"Table crumb sweep",7,["food","medium","wide","visual","rhythm"]],
  [366,"Ring light catch in wine glass",7,["drink","medium","medium","audio","rhythm"]],
  [367,"Napkin rose fold",7,["food","medium","medium","visual","rhythm"]],
  [368,"Straw bubbles in cocktail",7,["drink","medium","medium","audio","rhythm"]],
  [369,"Ice sphere crack when spirit hits",7,["food","medium","close","audio","rhythm"]],
  [370,"Truffle shave over dish",7,["food","medium","close","visual","rhythm"]],
  [371,"Duotone color wash",8,["brand","medium","medium","visual","rhythm"]],
  [372,"Halftone dot pattern",8,["brand","medium","medium","visual","texture"]],
  [373,"Line art rotoscope",8,["brand","medium","medium","visual","rhythm"]],
  [374,"VHS tracking distortion",8,["brand","medium","medium","motion","rhythm"]],
  [375,"Scratch-card reveal effect",8,["brand","medium","medium","visual","opener"]],
  [376,"X-ray cutaway inside a dish",8,["food","medium","medium","visual","transition"]],
  [377,"Blueprint schematic overlay",8,["brand","medium","medium","visual","texture"]],
  [378,"Pop art Warhol color blocks",8,["brand","fast","medium","audio","rhythm"]],
  [379,"Comic book panel layout",8,["brand","medium","medium","motion","rhythm"]],
  [380,"Vintage postcard treatment",8,["brand","medium","medium","visual","rhythm"]],
  [381,"Polaroid frame overlay",8,["brand","medium","medium","visual","texture"]],
  [382,"Film strip sprocket frame",8,["brand","medium","medium","visual","rhythm"]],
  [383,"Split-screen comparison",8,["brand","medium","medium","visual","rhythm"]],
  [384,"Quad-screen grid",8,["brand","medium","medium","visual","rhythm"]],
  [385,"Scrolling ticker tape",8,["brand","medium","medium","visual","rhythm"]],
  [386,"Sports broadcast overlay",8,["brand","medium","medium","visual","texture"]],
  [387,"Price tag pop-up",8,["food","fast","medium","audio","rhythm"]],
  [388,"Ingredient list callout",8,["food","medium","medium","visual","rhythm"]],
  [389,"Progress bar overlay cook time",8,["people","medium","medium","visual","texture"]],
  [390,"Minimalist geometric frame",8,["brand","medium","medium","visual","rhythm"]],
  [391,"Art deco border",8,["brand","medium","medium","visual","rhythm"]],
  [392,"Retro diner sign style",8,["people","medium","medium","visual","rhythm"]],
  [393,"Vintage matchbook cover",8,["brand","medium","medium","visual","transition"]],
  [394,"Tiki bar tropical treatment",8,["space","medium","medium","visual","rhythm"]],
  [395,"Speakeasy prohibition-era",8,["brand","medium","medium","visual","rhythm"]],
  [396,"Mid-century modern flat design",8,["brand","medium","medium","visual","rhythm"]],
  [397,"Memphis design 80s geometric",8,["brand","medium","medium","visual","rhythm"]],
  [398,"Bauhaus grid composition",8,["brand","medium","medium","visual","rhythm"]],
  [399,"Swiss design minimal type grid",8,["brand","medium","medium","visual","rhythm"]],
  [400,"Psychedelic swirl color",8,["brand","medium","medium","visual","rhythm"]],
  [401,"Noir detective film B&W shadows",8,["brand","medium","medium","visual","rhythm"]],
  [402,"1920s silent film title card",8,["brand","medium","medium","visual","rhythm"]],
  [403,"8-bit pixel art overlay",8,["brand","medium","medium","visual","texture"]],
  [404,"Glitch art corruption",8,["brand","medium","medium","visual","rhythm"]],
  [405,"Scanline CRT monitor",8,["gear","medium","medium","visual","rhythm"]],
  [406,"Double exposure blend",8,["brand","medium","medium","visual","closer"]],
  [407,"Kaleidoscope mirror effect",8,["brand","medium","medium","visual","rhythm"]],
  [408,"Prism rainbow light leak",8,["brand","medium","medium","visual","rhythm"]],
  [409,"Lens flare punctuation",8,["brand","medium","medium","visual","rhythm"]],
  [410,"Film grain overlay",8,["brand","medium","medium","tactile","texture"]],
  [411,"Vignette gradient",8,["brand","medium","medium","visual","rhythm"]],
  [412,"Color isolation one color saturated",8,["brand","medium","medium","visual","rhythm"]],
  [413,"Infrared false color",8,["brand","medium","medium","visual","rhythm"]],
  [414,"Thermal imaging simulation",8,["brand","medium","medium","thermal","rhythm"]],
  [415,"Newspaper classified ad layout",8,["space","medium","medium","visual","rhythm"]],
  [416,"Instagram-poll-style comparison",8,["brand","medium","medium","visual","rhythm"]],
  [417,"Swipe-to-reveal wipe line",8,["brand","medium","medium","visual","opener"]],
  [418,"Floating annotation labels",8,["brand","medium","medium","visual","rhythm"]],
  [419,"Countdown timer overlay",8,["brand","medium","medium","visual","texture"]],
  [420,"Location pin drop graphic",8,["brand","medium","medium","visual","rhythm"]],
  [421,"Star rating animation",8,["brand","medium","medium","visual","rhythm"]],
  [422,"QR code integration",8,["brand","medium","medium","visual","rhythm"]],
  [423,"Stamp of approval graphic",8,["brand","medium","medium","visual","rhythm"]],
  [424,"Wax seal badge overlay",8,["brand","medium","medium","visual","texture"]],
  [425,"Ribbon banner graphic",8,["brand","medium","medium","visual","rhythm"]],
  [426,"Torn paper edge reveal",8,["brand","medium","medium","visual","opener"]],
  [427,"Folded paper origami transition",8,["brand","medium","medium","visual","transition"]],
  [428,"Puzzle piece assembly",8,["brand","medium","medium","visual","payoff"]],
  [429,"Scratch mark tally count",8,["brand","medium","medium","visual","rhythm"]],
  [430,"Chalkboard doodle illustration",8,["brand","medium","medium","visual","rhythm"]],
  [431,"Ingredient journey farm to plate",9,["food","medium","medium","visual","payoff"]],
  [432,"Hands-only story no face",9,["brand","medium","medium","visual","rhythm"]],
  [433,"ASMR-first edit sound drives visual",9,["brand","medium","medium","audio","opener"]],
  [434,"Guest POV first person experience",9,["people","medium","medium","visual","opener"]],
  [435,"Empty-to-full transformation",9,["brand","medium","medium","visual","rhythm"]],
  [436,"Before after raw to cooked",9,["people","medium","medium","visual","rhythm"]],
  [437,"Day-in-the-life of a chef",9,["people","medium","medium","visual","rhythm"]],
  [438,"Day-in-the-life of a bartender",9,["people","medium","medium","visual","closer"]],
  [439,"Day-in-the-life of a server",9,["people","medium","medium","visual","rhythm"]],
  [440,"One dish three ways",9,["food","medium","medium","visual","rhythm"]],
  [441,"Regulars order",9,["brand","medium","medium","visual","rhythm"]],
  [442,"From scratch narrative",9,["brand","medium","medium","visual","rhythm"]],
  [443,"The last bite",9,["brand","medium","medium","visual","closer"]],
  [444,"The first sip",9,["brand","medium","medium","visual","opener"]],
  [445,"Secret menu reveal",9,["brand","medium","medium","visual","opener"]],
  [446,"Staff pick personal favorite",9,["people","medium","medium","visual","rhythm"]],
  [447,"Blind taste test reaction",9,["people","medium","medium","visual","rhythm"]],
  [448,"Kitchen chaos to plated calm",9,["food","fast","medium","visual","payoff"]],
  [449,"Clock-based narrative 5pm to midnight",9,["brand","medium","medium","visual","closer"]],
  [450,"Seasonal ingredient spotlight",9,["food","medium","medium","visual","rhythm"]],
  [451,"Head-to-head dish battle",9,["food","medium","medium","visual","rhythm"]],
  [452,"The build-up showing every component",9,["brand","medium","medium","visual","payoff"]],
  [453,"Deconstructed dish explanation",9,["food","medium","medium","visual","rhythm"]],
  [454,"One-take service kitchen to table",9,["space","medium","medium","thermal","rhythm"]],
  [455,"Nostalgia callback vintage to modern",9,["brand","medium","medium","visual","rhythm"]],
  [456,"Guest testimonial candid reactions",9,["people","medium","medium","visual","rhythm"]],
  [457,"What X gets you price tier",9,["food","medium","medium","thermal","rhythm"]],
  [458,"How its made process documentary",9,["brand","medium","medium","visual","rhythm"]],
  [459,"Bartenders choice",9,["people","medium","medium","thermal","closer"]],
  [460,"Wine pairing story",9,["drink","medium","medium","audio","rhythm"]],
  [461,"The transformation ingredient to hero",9,["food","medium","medium","visual","payoff"]],
  [462,"Community spotlight local supplier",9,["brand","medium","medium","visual","rhythm"]],
  [463,"Challenge format chef makes X in Y min",9,["people","medium","medium","visual","rhythm"]],
  [464,"Historical origin story dishs roots",9,["food","medium","medium","visual","rhythm"]],
  [465,"Shift change transition",9,["brand","medium","medium","visual","transition"]],
  [466,"Reservation to dessert full arc",9,["food","medium","medium","visual","rhythm"]],
  [467,"The handoff kitchen to server to table",9,["people","medium","medium","visual","rhythm"]],
  [468,"I tried everything on the menu",9,["brand","medium","medium","visual","rhythm"]],
  [469,"Staff meal reveal",9,["people","medium","medium","visual","opener"]],
  [470,"The perfect pour technique doc",9,["drink","medium","close","visual","payoff"]],
  [471,"Recipe tutorial step-by-step",9,["food","medium","medium","visual","rhythm"]],
  [472,"Myth-busting food misconceptions",9,["food","medium","medium","visual","rhythm"]],
  [473,"Guest surprise delight moment",9,["people","medium","medium","visual","rhythm"]],
  [474,"What I ordered vs what I got positive",9,["brand","medium","medium","visual","rhythm"]],
  [475,"BTS cleaning prep",9,["brand","medium","medium","visual","rhythm"]],
  [476,"Supplier delivery arrival",9,["brand","medium","medium","visual","rhythm"]],
  [477,"Tableside preparation",9,["brand","medium","medium","visual","rhythm"]],
  [478,"Vintage recipe recreation",9,["food","medium","medium","visual","rhythm"]],
  [479,"Cultural fusion story",9,["brand","medium","medium","visual","rhythm"]],
  [480,"If this dish were a person",9,["food","medium","medium","visual","rhythm"]],
  [481,"Color story all one color",9,["brand","medium","medium","visual","rhythm"]],
  [482,"Texture story all crunch smooth",9,["brand","medium","medium","audio","texture"]],
  [483,"Temperature story fire and ice",9,["brand","medium","medium","thermal","rhythm"]],
  [484,"Sound story kitchen sounds 60 sec",9,["space","medium","medium","audio","rhythm"]],
  [485,"The regulars table",9,["brand","medium","medium","visual","rhythm"]],
  [486,"Closing time ritual",9,["brand","medium","medium","visual","closer"]],
  [487,"Opening prep ritual",9,["brand","medium","medium","visual","opener"]],
  [488,"The accident turned masterpiece",9,["brand","medium","medium","visual","rhythm"]],
  [489,"Five senses framework",9,["brand","medium","medium","visual","rhythm"]],
  [490,"Letter to the guest text overlay",9,["people","medium","medium","visual","texture"]],
  [491,"Youve been doing it wrong",9,["brand","medium","medium","visual","rhythm"]],
  [492,"Side-by-side prep two chefs same dish",9,["food","medium","medium","visual","rhythm"]],
  [493,"The apprentice learns",9,["brand","medium","medium","thermal","rhythm"]],
  [494,"What happens after you leave",9,["brand","medium","medium","visual","rhythm"]],
  [495,"Lost and found stories",9,["brand","medium","medium","visual","rhythm"]],
  [496,"The last order of the night",9,["brand","medium","medium","visual","closer"]],
  [497,"Weather-based narrative",9,["brand","medium","medium","visual","rhythm"]],
  [498,"The one that got away LTO return",9,["brand","medium","medium","visual","rhythm"]],
  [499,"Full-circle narrative",9,["brand","medium","medium","visual","rhythm"]],
  [500,"Silent film storytelling",9,["brand","medium","medium","visual","rhythm"]],
  [501,"Neon noir crushed blacks neon accents",10,["brand","medium","medium","visual","rhythm"]],
  [502,"Warm golden amber",10,["brand","medium","medium","thermal","rhythm"]],
  [503,"High-key bright and airy",10,["brand","medium","medium","visual","rhythm"]],
  [504,"Desaturated matte editorial",10,["brand","medium","medium","visual","rhythm"]],
  [505,"Teal and orange blockbuster",10,["drink","medium","medium","visual","rhythm"]],
  [506,"Monochromatic single-hue wash",10,["brand","slow","medium","visual","rhythm"]],
  [507,"Sepia vintage tone",10,["brand","medium","medium","visual","rhythm"]],
  [508,"Cross-processed film unexpected shifts",10,["brand","medium","medium","visual","transition"]],
  [509,"Bleach bypass reduced sat high contrast",10,["brand","medium","medium","visual","rhythm"]],
  [510,"Day-for-night grade",10,["brand","medium","medium","visual","closer"]],
  [511,"Kodak Portra emulation",10,["brand","medium","medium","visual","rhythm"]],
  [512,"Fuji Velvia emulation punchy saturation",10,["brand","fast","medium","visual","rhythm"]],
  [513,"Cinestill 800T tungsten halation",10,["brand","slow","medium","visual","rhythm"]],
  [514,"Technicolor two-strip",10,["brand","medium","medium","visual","rhythm"]],
  [515,"Black and white high contrast",10,["brand","medium","medium","visual","rhythm"]],
  [516,"Black and white soft low contrast",10,["brand","slow","medium","visual","rhythm"]],
  [517,"Split tone warm highlights cool shadows",10,["brand","medium","medium","thermal","rhythm"]],
  [518,"Split tone cool highlights warm shadows",10,["brand","medium","medium","thermal","rhythm"]],
  [519,"Crushed blacks lifted whites faded vintage",10,["brand","medium","medium","visual","rhythm"]],
  [520,"S-curve punchy contrast",10,["brand","fast","medium","visual","rhythm"]],
  [521,"Single color pop one saturated rest B&W",10,["brand","slow","medium","audio","rhythm"]],
  [522,"Complementary color emphasis",10,["brand","medium","medium","visual","rhythm"]],
  [523,"Analogous harmony grade",10,["brand","medium","medium","visual","closer"]],
  [524,"Triadic color enhancement",10,["brand","medium","medium","visual","rhythm"]],
  [525,"Selective color muting except food",10,["food","medium","medium","visual","rhythm"]],
  [526,"Skin tone protection grade",10,["brand","medium","medium","visual","rhythm"]],
  [527,"Deep shadow detail lifted blacks",10,["brand","medium","macro","visual","texture"]],
  [528,"Blown highlight intentional",10,["brand","medium","medium","visual","rhythm"]],
  [529,"Red emphasis grade",10,["brand","medium","medium","visual","rhythm"]],
  [530,"Green emphasis grade",10,["brand","medium","medium","visual","rhythm"]],
  [531,"Blue hour exterior grade",10,["space","medium","medium","visual","rhythm"]],
  [532,"Sodium vapor streetlight grade",10,["brand","medium","medium","visual","rhythm"]],
  [533,"Fluorescent green-cast intentional",10,["brand","medium","medium","visual","rhythm"]],
  [534,"Amber ale grade",10,["drink","medium","medium","visual","rhythm"]],
  [535,"Rose gold tone",10,["brand","medium","medium","visual","rhythm"]],
  [536,"Midnight blue grade",10,["brand","medium","medium","visual","closer"]],
  [537,"Autumn palette grade",10,["brand","medium","medium","visual","rhythm"]],
  [538,"Winter cold grade",10,["brand","medium","medium","thermal","rhythm"]],
  [539,"Spring fresh grade",10,["brand","medium","medium","audio","rhythm"]],
  [540,"Summer heat grade",10,["brand","medium","medium","thermal","rhythm"]],
  [541,"Film print fade",10,["brand","medium","medium","visual","rhythm"]],
  [542,"HDR tone-mapped look",10,["brand","medium","medium","visual","rhythm"]],
  [543,"Lo-fi Instagram vintage",10,["brand","medium","medium","visual","rhythm"]],
  [544,"High fashion editorial grade",10,["brand","medium","medium","visual","rhythm"]],
  [545,"Documentary neutral",10,["brand","medium","medium","visual","rhythm"]],
  [546,"Music video high-saturation pop",10,["brand","fast","medium","audio","rhythm"]],
  [547,"Horror-adjacent desaturation",10,["brand","medium","medium","visual","rhythm"]],
  [548,"Wes Anderson pastel palette",10,["brand","medium","medium","visual","rhythm"]],
  [549,"Michael Mann digital night",10,["brand","medium","medium","visual","closer"]],
  [550,"Wong Kar-wai expired film",10,["brand","medium","medium","visual","rhythm"]],
  [551,"Beat-synced cuts",11,["food","fast","medium","audio","transition"]],
  [552,"Bass drop slow-mo trigger",11,["food","slow","medium","visual","rhythm"]],
  [553,"Music builds to food reveal",11,["food","medium","medium","audio","opener"]],
  [554,"ASMR crunch amplification",11,["food","medium","medium","audio","rhythm"]],
  [555,"ASMR sizzle focus",11,["food","medium","medium","audio","rhythm"]],
  [556,"ASMR pour emphasis",11,["drink","medium","close","audio","rhythm"]],
  [557,"ASMR knife work",11,["food","medium","medium","audio","rhythm"]],
  [558,"ASMR fizz carbonation",11,["drink","medium","medium","audio","rhythm"]],
  [559,"Heartbeat rhythm edit",11,["food","fast","medium","audio","rhythm"]],
  [560,"Foley sound design exaggerated",11,["brand","medium","medium","audio","rhythm"]],
  [561,"Silent moment contrast",11,["food","medium","medium","visual","rhythm"]],
  [562,"Vinyl crackle background",11,["food","medium","close","audio","texture"]],
  [563,"Radio tuning dial transition",11,["food","medium","medium","visual","transition"]],
  [564,"Live band audio transition",11,["food","medium","medium","audio","transition"]],
  [565,"Cash register cha-ching",11,["food","medium","medium","visual","rhythm"]],
  [566,"Slot machine jingle",11,["food","medium","medium","audio","rhythm"]],
  [567,"Kitchen ticket printer sound",11,["space","medium","medium","audio","rhythm"]],
  [568,"Cocktail shaker rhythm as percussion",11,["drink","fast","medium","audio","rhythm"]],
  [569,"Wine glass clink punctuation",11,["drink","medium","medium","audio","rhythm"]],
  [570,"Ambient crowd murmur bed",11,["people","medium","medium","audio","texture"]],
  [571,"Single instrument spotlight",11,["food","slow","medium","visual","rhythm"]],
  [572,"Genre-matched scoring",11,["food","medium","medium","audio","transition"]],
  [573,"Sound effect exaggeration cartoon",11,["food","medium","medium","audio","rhythm"]],
  [574,"Audio ducking for text emphasis",11,["food","medium","medium","audio","rhythm"]],
  [575,"Reverse audio reveal",11,["food","medium","medium","audio","opener"]],
  [576,"Room tone shift indoor to outdoor",11,["space","medium","medium","visual","transition"]],
  [577,"Table ambiance sound design",11,["brand","medium","medium","audio","rhythm"]],
  [578,"Countdown beep sequence",11,["food","medium","medium","visual","rhythm"]],
  [579,"Nature sound bed outdoor dining",11,["space","medium","medium","audio","rhythm"]],
  [580,"Industrial kitchen soundscape",11,["space","medium","medium","audio","rhythm"]],
  [581,"Champagne fizz ASMR",11,["drink","medium","medium","audio","rhythm"]],
  [582,"Ice in glass rattle ASMR",11,["food","medium","medium","audio","rhythm"]],
  [583,"Coffee grinder ASMR",11,["drink","medium","medium","audio","rhythm"]],
  [584,"Mortar and pestle grinding ASMR",11,["food","medium","medium","audio","rhythm"]],
  [585,"Wok toss sizzle ASMR",11,["food","medium","medium","audio","rhythm"]],
  [586,"Pepper crack ASMR",11,["food","medium","close","audio","rhythm"]],
  [587,"Bread crust crackle ASMR",11,["food","medium","close","audio","rhythm"]],
  [588,"Chocolate snap ASMR",11,["food","fast","medium","audio","rhythm"]],
  [589,"Soup ladle splash ASMR",11,["food","medium","medium","audio","rhythm"]],
  [590,"Plate set-down ceramic clink",11,["food","medium","medium","audio","payoff"]],
  [591,"Silverware arrangement tinkling",11,["food","medium","medium","visual","rhythm"]],
  [592,"Cork squeak wine bottle",11,["drink","medium","medium","tactile","rhythm"]],
  [593,"Draft beer hiss",11,["drink","medium","medium","visual","rhythm"]],
  [594,"Mixer whirring cocktail blender",11,["drink","medium","medium","audio","closer"]],
  [595,"Grill lid lift steam whoosh",11,["drink","medium","medium","audio","rhythm"]],
  [596,"Walk-in cooler door suction pop",11,["food","fast","medium","audio","rhythm"]],
  [597,"Ticket machine rip",11,["food","medium","medium","visual","rhythm"]],
  [598,"Chef call heard ordering",11,["people","medium","medium","audio","rhythm"]],
  [599,"Crowd cheer reaction",11,["people","medium","medium","audio","rhythm"]],
  [600,"Last call bell ring",11,["food","medium","medium","audio","closer"]],
  [601,"Birdseye ingredient wheel",12,["food","medium","aerial","visual","rhythm"]],
  [602,"Sauce cascade waterfall pour",12,["food","medium","close","visual","rhythm"]],
  [603,"Steam rising hero",12,["drink","medium","medium","thermal","payoff"]],
  [604,"Cheese stretch close-up",12,["food","medium","close","visual","rhythm"]],
  [605,"Crispy shell crack macro",12,["food","medium","macro","audio","texture"]],
  [606,"Sauce drip isolated",12,["food","medium","medium","visual","rhythm"]],
  [607,"Ingredient rain falling into frame",12,["food","medium","medium","visual","rhythm"]],
  [608,"Cross-section cut reveal",12,["food","medium","medium","visual","opener"]],
  [609,"Table spread reveal overhead",12,["food","medium","wide","visual","opener"]],
  [610,"Plating sequence start to finish",12,["food","medium","medium","visual","opener"]],
  [611,"Sushi precision roll macro",12,["food","medium","macro","visual","payoff"]],
  [612,"Steak sear crust detail",12,["food","medium","macro","visual","texture"]],
  [613,"Dessert construction layer by layer",12,["food","medium","medium","visual","payoff"]],
  [614,"Cocktail color gradient build",12,["drink","medium","medium","visual","payoff"]],
  [615,"Bread scoring knife detail",12,["food","medium","macro","audio","texture"]],
  [616,"Glaze pour over pastry",12,["drink","medium","close","visual","rhythm"]],
  [617,"Garnish placement precision",12,["food","medium","close","visual","payoff"]],
  [618,"Foam art on soup",12,["food","medium","medium","visual","rhythm"]],
  [619,"Oil sizzle entry into pan",12,["food","medium","medium","audio","rhythm"]],
  [620,"Cheese melt time-lapse",12,["food","fast","medium","thermal","rhythm"]],
  [621,"Fruit slice fan arrangement",12,["food","medium","close","thermal","rhythm"]],
  [622,"Dumpling fold close-up",12,["food","medium","close","visual","rhythm"]],
  [623,"Pizza stretch pull",12,["food","medium","close","visual","rhythm"]],
  [624,"Stir-fry wok flip",12,["food","medium","medium","motion","rhythm"]],
  [625,"Crepe spread and fill",12,["food","medium","wide","visual","rhythm"]],
  [626,"Ice cream scoop curl",12,["brand","medium","close","thermal","rhythm"]],
  [627,"Ramen noodle lift with chopsticks",12,["food","medium","medium","visual","rhythm"]],
  [628,"Burger stack build",12,["food","medium","medium","visual","payoff"]],
  [629,"Taco assembly line",12,["food","medium","medium","visual","payoff"]],
  [630,"Pancake flip",12,["food","medium","medium","motion","rhythm"]],
  [631,"Egg sunny-side-up cook",12,["food","medium","medium","visual","rhythm"]],
  [632,"Seafood tower assembly",12,["food","medium","medium","visual","payoff"]],
  [633,"Charcuterie board arrangement",12,["food","medium","medium","visual","transition"]],
  [634,"Dim sum steamer basket open",12,["drink","medium","medium","thermal","opener"]],
  [635,"Fondue dip and pull",12,["food","medium","close","visual","rhythm"]],
  [636,"Oyster on half shell presentation",12,["food","medium","medium","visual","payoff"]],
  [637,"Ceviche citrus cure reaction",12,["food","medium","medium","visual","rhythm"]],
  [638,"Sourdough score and bake",12,["food","medium","medium","visual","rhythm"]],
  [639,"Tartare preparation tableside",12,["food","medium","medium","visual","rhythm"]],
  [640,"Pasta sheet roller",12,["food","medium","medium","visual","rhythm"]],
  [641,"Tempura batter dip and fry",12,["food","medium","medium","visual","rhythm"]],
  [642,"Wagyu sear close-up",12,["food","medium","close","visual","rhythm"]],
  [643,"Lobster tail butterfly",12,["food","medium","medium","motion","rhythm"]],
  [644,"Mousse set and unmold",12,["food","medium","medium","visual","rhythm"]],
  [645,"Torched meringue color change",12,["food","medium","medium","audio","transition"]],
  [646,"Bone marrow scoop",12,["food","medium","medium","visual","rhythm"]],
  [647,"Risotto mantecatura final stir",12,["food","medium","medium","visual","closer"]],
  [648,"Duck breast score pattern",12,["food","medium","medium","visual","texture"]],
  [649,"Creme brulee torch and crack",12,["food","medium","close","audio","rhythm"]],
  [650,"Gyoza crispy bottom reveal",12,["food","medium","medium","visual","opener"]],
  [651,"Bao bun steam open",12,["food","medium","medium","thermal","opener"]],
  [652,"Poke bowl layered assembly",12,["food","medium","medium","visual","payoff"]],
  [653,"Smoking gun cloche lift reveal",12,["food","medium","medium","visual","opener"]],
  [654,"Butter baste spoon technique",12,["food","medium","medium","visual","rhythm"]],
  [655,"Souffles rise through oven window",12,["food","medium","medium","tactile","rhythm"]],
  [656,"Hand-pulled noodle stretch",12,["food","medium","close","visual","rhythm"]],
  [657,"Raclette cheese scrape",12,["food","medium","medium","visual","rhythm"]],
  [658,"Salt crust crack open",12,["food","medium","close","audio","opener"]],
  [659,"Tableside caesar toss",12,["food","medium","medium","motion","rhythm"]],
  [660,"Bananas foster ignition",12,["food","medium","medium","visual","rhythm"]],
  [661,"Raw bar shucking sequence",12,["space","medium","medium","visual","rhythm"]],
  [662,"Bread service basket steam",12,["food","medium","medium","thermal","rhythm"]],
  [663,"Amuse-bouche single bite",12,["food","slow","medium","visual","rhythm"]],
  [664,"Cocktail smoke bubble pop",12,["drink","fast","medium","audio","rhythm"]],
  [665,"Wine aeration pour",12,["drink","medium","close","visual","rhythm"]],
  [666,"Deglazing wine splash",12,["drink","medium","medium","visual","rhythm"]],
  [667,"Final plate wipe clean edge",12,["food","medium","medium","visual","transition"]],
  [668,"Microgreen tweezers placement",12,["food","medium","macro","visual","rhythm"]],
  [669,"Tuile cookie shaping while hot",12,["people","medium","medium","thermal","rhythm"]],
  [670,"Chocolate sphere hot sauce melt",12,["food","medium","medium","thermal","rhythm"]],
  [671,"Grand entrance reveal",13,["space","medium","medium","visual","opener"]],
  [672,"Booth intimacy framing",13,["space","medium","medium","visual","rhythm"]],
  [673,"Bar back panorama",13,["space","medium","wide","motion","rhythm"]],
  [674,"Kitchen pass window",13,["space","medium","medium","visual","rhythm"]],
  [675,"Dining room golden hour sweep",13,["space","medium","wide","visual","rhythm"]],
  [676,"Rooftop patio establishing",13,["space","medium","wide","visual","opener"]],
  [677,"Neon-lit hallway tracking",13,["space","medium","medium","motion","rhythm"]],
  [678,"Private dining room reveal",13,["space","medium","medium","visual","opener"]],
  [679,"Restroom vanity mirror moment",13,["space","medium","medium","visual","rhythm"]],
  [680,"Parking lot to door journey",13,["space","medium","medium","visual","rhythm"]],
  [681,"Wine cellar descent",13,["drink","medium","medium","visual","rhythm"]],
  [682,"Kitchen chaos wide shot",13,["space","fast","wide","thermal","rhythm"]],
  [683,"Empty restaurant atmosphere",13,["space","medium","wide","visual","texture"]],
  [684,"Exterior signage dusk establishing",13,["space","medium","wide","visual","opener"]],
  [685,"Ceiling detail overhead look-up",13,["space","medium","macro","visual","texture"]],
  [686,"Staircase descent reveal",13,["space","medium","medium","visual","opener"]],
  [687,"Window seat exterior view",13,["space","medium","medium","visual","rhythm"]],
  [688,"Open kitchen theater",13,["space","medium","medium","thermal","opener"]],
  [689,"Host stand welcome point",13,["people","medium","medium","visual","rhythm"]],
  [690,"Coat check cloakroom moment",13,["space","medium","medium","visual","rhythm"]],
  [691,"Elevator ride transition",13,["space","medium","medium","visual","transition"]],
  [692,"Corridor walk POV",13,["space","medium","medium","motion","rhythm"]],
  [693,"Outdoor seating atmosphere",13,["space","medium","wide","visual","texture"]],
  [694,"Kitchen garden walkthrough",13,["space","medium","medium","tactile","rhythm"]],
  [695,"Loading dock raw industrial",13,["space","medium","medium","visual","rhythm"]],
  [696,"Walk-in cooler fog reveal",13,["space","medium","medium","thermal","opener"]],
  [697,"Dishpit steam atmosphere",13,["food","medium","wide","thermal","texture"]],
  [698,"Chef's table perspective",13,["people","medium","medium","visual","rhythm"]],
  [699,"Raw bar station wide",13,["space","medium","wide","visual","rhythm"]],
  [700,"Sushi counter straight-on",13,["food","medium","medium","visual","rhythm"]],
  [701,"Pizza oven fire glow interior",13,["food","medium","medium","thermal","texture"]],
  [702,"Smoker chamber peek",13,["space","medium","medium","visual","rhythm"]],
  [703,"Pastry case display macro",13,["space","medium","macro","visual","texture"]],
  [704,"Beer tap wall installation",13,["drink","medium","medium","visual","rhythm"]],
  [705,"Wine wall display",13,["drink","medium","medium","visual","rhythm"]],
  [706,"Liquor shelf backlit glory",13,["space","medium","medium","visual","payoff"]],
  [707,"Communal table long-shot",13,["space","medium","medium","thermal","rhythm"]],
  [708,"Banquette detail texture",13,["space","medium","macro","tactile","texture"]],
  [709,"Flooring transition threshold",13,["space","medium","medium","audio","transition"]],
  [710,"Chandelier hanging detail",13,["space","medium","macro","visual","texture"]],
  [711,"Exposed ductwork industrial ceiling",13,["space","medium","medium","visual","rhythm"]],
  [712,"Aquarium or water feature",13,["space","medium","medium","visual","rhythm"]],
  [713,"Fireplace hearth glow",13,["space","medium","medium","thermal","texture"]],
  [714,"Live edge wood bar detail",13,["space","medium","macro","tactile","texture"]],
  [715,"Tile work pattern close-up",13,["space","medium","close","visual","texture"]],
  [716,"Vintage photograph wall gallery",13,["space","medium","medium","thermal","rhythm"]],
  [717,"Neon sign solo beauty shot",13,["people","medium","medium","thermal","payoff"]],
  [718,"Table number or reservation card",13,["space","medium","medium","visual","rhythm"]],
  [719,"Salt pepper shaker still life",13,["space","slow","medium","visual","rhythm"]],
  [720,"Candle lineup ambiance",13,["space","slow","medium","visual","rhythm"]],
  [721,"Menu design close-up",13,["brand","medium","close","visual","rhythm"]],
  [722,"Matchbook branded detail",13,["brand","medium","macro","visual","transition"]],
  [723,"Coaster branded detail",13,["brand","medium","macro","visual","texture"]],
  [724,"Napkin fold detail",13,["space","medium","macro","visual","texture"]],
  [725,"Chair fabric detail",13,["space","medium","macro","tactile","texture"]],
  [726,"Door handle entry detail",13,["brand","medium","macro","visual","texture"]],
  [727,"Window frost condensation exterior",13,["space","medium","medium","thermal","rhythm"]],
  [728,"Awning or signage overhead",13,["brand","medium","aerial","visual","rhythm"]],
  [729,"Parking or valet establishing",13,["people","medium","wide","visual","opener"]],
  [730,"Neighborhood context establishing",13,["space","medium","wide","visual","opener"]],
  [731,"Chef hands at work",14,["people","medium","medium","visual","rhythm"]],
  [732,"Guest first bite reaction",14,["people","medium","medium","visual","opener"]],
  [733,"Bartender flair toss",14,["people","fast","medium","motion","closer"]],
  [734,"Server table approach",14,["people","medium","medium","motion","opener"]],
  [735,"Couple date night moment",14,["people","medium","medium","visual","closer"]],
  [736,"Group toast cheers",14,["people","medium","medium","audio","rhythm"]],
  [737,"Chef tasting spoon moment",14,["people","medium","medium","visual","rhythm"]],
  [738,"Sommelier pour ritual",14,["drink","medium","close","visual","rhythm"]],
  [739,"Host greeting welcome",14,["people","medium","medium","visual","rhythm"]],
  [740,"Kitchen brigade line call",14,["people","medium","medium","visual","rhythm"]],
  [741,"Guest smile candid",14,["people","medium","medium","visual","rhythm"]],
  [742,"Chef plating precision detail",14,["people","medium","macro","visual","payoff"]],
  [743,"Cocktail garnish craft detail",14,["drink","medium","macro","visual","payoff"]],
  [744,"Family gathering table moment",14,["people","medium","medium","audio","rhythm"]],
  [745,"Solo diner contemplation",14,["people","slow","medium","visual","payoff"]],
  [746,"Friends laughing together",14,["people","medium","medium","visual","closer"]],
  [747,"Chef instructor teaching moment",14,["drink","medium","medium","visual","rhythm"]],
  [748,"Dishwasher hustle respect shot",14,["food","medium","medium","thermal","rhythm"]],
  [749,"Manager floor check",14,["people","medium","medium","visual","rhythm"]],
  [750,"Busser table reset efficiency",14,["people","medium","medium","visual","rhythm"]],
  [751,"Wine pour sommelier close-up",14,["drink","medium","close","visual","rhythm"]],
  [752,"Bread basket pass across table",14,["food","medium","medium","visual","rhythm"]],
  [753,"Menu discussion deciding moment",14,["people","medium","medium","visual","rhythm"]],
  [754,"Photo of food guest takes photo",14,["food","medium","medium","thermal","rhythm"]],
  [755,"Sharing plate passing dishes",14,["food","medium","medium","audio","payoff"]],
  [756,"Anniversary surprise dessert",14,["food","medium","medium","visual","rhythm"]],
  [757,"Birthday candle blow-out",14,["people","slow","medium","visual","rhythm"]],
  [758,"Proposal moment",14,["people","medium","medium","visual","rhythm"]],
  [759,"Business dinner handshake",14,["people","medium","medium","visual","rhythm"]],
  [760,"Chef greeting table visit",14,["people","medium","medium","visual","rhythm"]],
  [761,"Guest arrival coat removal",14,["people","medium","medium","visual","rhythm"]],
  [762,"Cocktail cheers clink slow-mo",14,["drink","slow","medium","audio","rhythm"]],
  [763,"Server recommendation gesture",14,["people","medium","medium","visual","closer"]],
  [764,"Child eating messy cute",14,["people","medium","medium","visual","transition"]],
  [765,"Elderly guest appreciation moment",14,["people","medium","medium","visual","rhythm"]],
  [766,"Kitchen high-five celebration",14,["space","medium","medium","visual","rhythm"]],
  [767,"Staff lineup pre-service meeting",14,["people","medium","medium","thermal","rhythm"]],
  [768,"Chef knife sharpening ritual",14,["people","medium","medium","visual","rhythm"]],
  [769,"Bartender ice cracking ritual",14,["people","medium","close","audio","closer"]],
  [770,"Host stand phone reservation",14,["people","medium","medium","visual","rhythm"]],
  [771,"Valet key handoff",14,["people","medium","medium","visual","rhythm"]],
  [772,"Gift card presentation",14,["people","medium","medium","visual","payoff"]],
  [773,"Doggy bag packaging care",14,["people","medium","medium","visual","rhythm"]],
  [774,"Exit wave goodbye warmth",14,["people","medium","medium","thermal","closer"]],
  [775,"Returning regular recognition",14,["people","medium","medium","visual","rhythm"]],
  [776,"First-time guest wonder look",14,["people","medium","medium","visual","opener"]],
  [777,"Kitchen injury bandaid moment",14,["space","medium","medium","visual","rhythm"]],
  [778,"Rain arrival umbrella shake",14,["people","medium","medium","visual","rhythm"]],
  [779,"Window seat people watching",14,["people","medium","medium","visual","rhythm"]],
  [780,"Reading alone with coffee wine",14,["drink","medium","medium","visual","rhythm"]],
  [781,"Live music audience reaction",14,["people","medium","medium","audio","rhythm"]],
  [782,"Karaoke moment crowd reaction",14,["people","medium","medium","visual","rhythm"]],
  [783,"Sports celebration at bar",14,["people","medium","medium","visual","rhythm"]],
  [784,"Quiet conversation intimate two-shot",14,["people","slow","medium","thermal","rhythm"]],
  [785,"Group selfie at table",14,["people","medium","medium","visual","rhythm"]],
  [786,"Instagramming the food close-up of phone",14,["food","medium","close","visual","rhythm"]],
  [787,"Server delivering check farewell",14,["people","medium","medium","audio","closer"]],
  [788,"Cash tip placement gratitude",14,["people","medium","medium","visual","rhythm"]],
  [789,"Credit card tap payment",14,["people","medium","medium","visual","rhythm"]],
  [790,"Menu QR code scan moment",14,["gear","medium","medium","visual","rhythm"]],
  [791,"Guest feedback comment card",14,["people","medium","medium","visual","rhythm"]],
  [792,"Chef autograph on menu plate",14,["food","medium","medium","visual","payoff"]],
  [793,"Loyalty card stamp",14,["people","medium","medium","visual","rhythm"]],
  [794,"Takeout pickup counter moment",14,["people","medium","medium","visual","rhythm"]],
  [795,"Delivery driver handoff",14,["people","medium","medium","visual","rhythm"]],
  [796,"Drive-through window exchange",14,["people","medium","medium","tactile","transition"]],
  [797,"Curbside pickup car approach",14,["people","medium","medium","motion","opener"]],
  [798,"Staff break cigarette alley moment",14,["people","medium","medium","visual","rhythm"]],
  [799,"Morning coffee pre-shift ritual",14,["drink","medium","medium","visual","opener"]],
  [800,"End of night staff drink together",14,["drink","medium","medium","visual","closer"]],
  [801,"AI-upscaled vintage footage",15,["brand","medium","medium","visual","rhythm"]],
  [802,"Digital twin walkthrough",15,["gear","medium","medium","tactile","rhythm"]],
  [803,"Augmented reality menu overlay",15,["brand","medium","medium","visual","texture"]],
  [804,"360 virtual tour embedded",15,["brand","medium","medium","visual","rhythm"]],
  [805,"Point cloud render aesthetic",15,["gear","medium","medium","visual","closer"]],
  [806,"Data visualization overlay",15,["brand","medium","medium","visual","texture"]],
  [807,"Generative background patterns",15,["brand","medium","medium","visual","texture"]],
  [808,"Morphing transition AI-blended",15,["brand","medium","medium","visual","transition"]],
  [809,"Neural style transfer food as painting",15,["food","medium","medium","visual","rhythm"]],
  [810,"Deepfake-style face swap comedic",15,["brand","medium","medium","visual","rhythm"]],
  [811,"AI voice narration generated VO",15,["brand","medium","medium","thermal","rhythm"]],
  [812,"Text-to-image illustration assist",15,["brand","medium","medium","visual","rhythm"]],
  [813,"Predictive trending topic overlay",15,["brand","medium","medium","visual","texture"]],
  [814,"Automated highlight reel compile",15,["brand","medium","medium","visual","rhythm"]],
  [815,"Smart crop auto-reframe multi-platform",15,["brand","medium","medium","visual","payoff"]],
  [816,"Color match AI consistency across shots",15,["brand","medium","medium","thermal","transition"]],
  [817,"Noise reduction AI low-light rescue",15,["brand","medium","medium","visual","rhythm"]],
  [818,"Object removal clean plate AI",15,["food","medium","medium","visual","payoff"]],
  [819,"Background replacement AI composite",15,["brand","medium","medium","visual","texture"]],
  [820,"Super slow-mo AI frame interpolation",15,["brand","slow","medium","visual","rhythm"]],
  [821,"Stabilization AI handheld rescue",15,["brand","medium","medium","visual","rhythm"]],
  [822,"Audio cleanup AI noise removal",15,["brand","medium","medium","audio","rhythm"]],
  [823,"Transcript overlay AI auto-caption",15,["brand","medium","medium","visual","texture"]],
  [824,"Sentiment analysis real-time overlay",15,["brand","medium","medium","visual","texture"]],
  [825,"Auto-thumbnail AI best frame",15,["brand","medium","medium","visual","payoff"]],
  [826,"Facial recognition blur privacy",15,["brand","medium","medium","visual","rhythm"]],
  [827,"Motion graphics AI-generated lower thirds",15,["brand","medium","medium","motion","rhythm"]],
  [828,"Beat detection auto-edit to music",15,["brand","fast","medium","audio","rhythm"]],
  [829,"Language translation overlay AI subtitle",15,["brand","medium","medium","visual","texture"]],
  [830,"Scene detection auto-chapter markers",15,["brand","medium","medium","visual","rhythm"]],
  [831,"Content-aware fill video",15,["brand","medium","medium","visual","rhythm"]],
  [832,"Rotoscoping AI subject isolation",15,["brand","medium","medium","visual","rhythm"]],
  [833,"Depth map generation fake bokeh",15,["brand","medium","medium","visual","rhythm"]],
  [834,"Cinemagraph AI loop detection",15,["brand","medium","medium","visual","rhythm"]],
  [835,"Time-of-day simulation AI lighting",15,["brand","medium","medium","visual","rhythm"]],
  [836,"Weather effect overlay AI rain snow",15,["brand","medium","medium","visual","texture"]],
  [837,"Crowd simulation AI fill",15,["people","medium","medium","visual","rhythm"]],
  [838,"Menu item recognition auto-label",15,["brand","medium","medium","visual","rhythm"]],
  [839,"Calorie count overlay AI estimation",15,["brand","medium","medium","visual","texture"]],
  [840,"Ingredient identification auto-tag",15,["food","medium","medium","visual","rhythm"]],
  [841,"Plating score AI composition analysis",15,["brand","medium","medium","visual","payoff"]],
  [842,"Color palette extraction from dish",15,["food","medium","medium","visual","rhythm"]],
  [843,"Texture analysis food quality check",15,["food","medium","medium","tactile","texture"]],
  [844,"Portion size comparison AI overlay",15,["brand","medium","medium","visual","texture"]],
  [845,"Freshness indicator AI color analysis",15,["brand","medium","medium","visual","rhythm"]],
  [846,"Recipe generation from video AI",15,["food","medium","medium","visual","rhythm"]],
  [847,"Nutritional breakdown overlay AI",15,["brand","medium","medium","visual","texture"]],
  [848,"Allergen flag overlay AI",15,["brand","medium","medium","visual","texture"]],
  [849,"Sustainability score overlay AI",15,["brand","medium","medium","visual","texture"]],
  [850,"Farm origin trace overlay AI",15,["brand","medium","medium","visual","texture"]],
  [851,"Super 8mm film emulation",16,["brand","medium","medium","visual","rhythm"]],
  [852,"35mm still photography motion",16,["brand","slow","medium","thermal","rhythm"]],
  [853,"Instant film development",16,["brand","medium","medium","visual","rhythm"]],
  [854,"Daguerreotype antique process",16,["brand","medium","medium","visual","rhythm"]],
  [855,"Hand-tinted black and white",16,["brand","medium","medium","visual","rhythm"]],
  [856,"Rear projection vintage composite",16,["brand","medium","medium","visual","rhythm"]],
  [857,"Cyanotype blueprint aesthetic",16,["brand","medium","medium","visual","rhythm"]],
  [858,"Wet plate collodion look",16,["food","medium","medium","visual","payoff"]],
  [859,"Pinhole camera vignette",16,["gear","medium","medium","visual","rhythm"]],
  [860,"Box camera vintage amateur",16,["gear","medium","medium","visual","rhythm"]],
  [861,"Medium format square crop",16,["brand","medium","medium","visual","rhythm"]],
  [862,"Large format tilt selective focus",16,["brand","medium","medium","motion","rhythm"]],
  [863,"Cross-processed slide film E6 in C41",16,["brand","medium","medium","motion","rhythm"]],
  [864,"Expired film color shift",16,["brand","medium","medium","visual","transition"]],
  [865,"Infrared film false color foliage",16,["brand","medium","medium","visual","rhythm"]],
  [866,"Lith print high contrast grain",16,["brand","medium","medium","tactile","texture"]],
  [867,"Sabattier effect solarization",16,["brand","medium","medium","visual","rhythm"]],
  [868,"Photogram direct shadow print",16,["gear","medium","medium","thermal","rhythm"]],
  [869,"Hand-developed uneven processing",16,["brand","medium","medium","visual","rhythm"]],
  [870,"Contact sheet layout",16,["brand","medium","medium","visual","rhythm"]],
  [871,"Photo booth strip format",16,["space","medium","medium","thermal","rhythm"]],
  [872,"View-Master stereoscopic",16,["brand","medium","medium","visual","rhythm"]],
  [873,"Kinetoscope early motion",16,["brand","medium","medium","motion","rhythm"]],
  [874,"Lumiere brothers single-shot",16,["brand","slow","medium","thermal","rhythm"]],
  [875,"German Expressionism angles shadows",16,["brand","medium","medium","visual","rhythm"]],
  [876,"French New Wave jump cuts",16,["brand","medium","medium","visual","transition"]],
  [877,"Italian Neorealism documentary natural",16,["brand","medium","medium","visual","rhythm"]],
  [878,"Technicolor golden age",16,["brand","medium","medium","visual","rhythm"]],
  [879,"Drive-in movie intermission",16,["brand","medium","medium","visual","rhythm"]],
  [880,"Home movie 70s handheld",16,["brand","medium","medium","visual","rhythm"]],
  [881,"Music video 90s quick cut",16,["brand","fast","wide","audio","transition"]],
  [882,"Skatevideo fisheye wide angle",16,["brand","medium","wide","visual","rhythm"]],
  [883,"Surveillance cam CCTV aesthetic",16,["brand","medium","medium","visual","rhythm"]],
  [884,"Webcam early internet",16,["brand","medium","medium","visual","rhythm"]],
  [885,"Disposable camera flash harsh",16,["gear","fast","medium","visual","rhythm"]],
  [886,"Toy camera Holga plastic lens",16,["gear","medium","medium","visual","closer"]],
  [887,"Double exposure analog in-camera",16,["gear","medium","medium","visual","rhythm"]],
  [888,"Light leak analog film gate",16,["brand","medium","medium","visual","rhythm"]],
  [889,"Sprocket hole exposed film edge",16,["brand","medium","medium","visual","rhythm"]],
  [890,"Reversal film transparency look",16,["space","medium","medium","visual","rhythm"]],
  [891,"Darkroom red light processing",16,["space","medium","medium","visual","rhythm"]],
  [892,"Newspaper halftone print",16,["space","medium","medium","visual","rhythm"]],
  [893,"Letterpress ink impression",16,["brand","medium","medium","visual","rhythm"]],
  [894,"Screen print CMYK overlay",16,["brand","medium","medium","visual","texture"]],
  [895,"Woodcut block print illustration",16,["brand","medium","medium","tactile","transition"]],
  [896,"Risograph limited color overprint",16,["brand","medium","medium","visual","rhythm"]],
  [897,"Mimeograph purple fuzzy duplicate",16,["brand","medium","medium","visual","rhythm"]],
  [898,"Carbon copy NCR paper look",16,["brand","medium","medium","visual","rhythm"]],
  [899,"Fax machine degraded transmission",16,["brand","medium","medium","visual","rhythm"]],
  [900,"Teletext broadcast graphics",16,["brand","medium","medium","visual","rhythm"]],
  [901,"Holiday decor macro",17,["brand","medium","macro","visual","texture"]],
  [902,"Harvest table spread",17,["brand","medium","wide","visual","rhythm"]],
  [903,"Valentines candlelight",17,["brand","slow","medium","visual","rhythm"]],
  [904,"New Years countdown toast",17,["brand","medium","medium","visual","rhythm"]],
  [905,"Summer patio golden hour",17,["space","medium","medium","visual","rhythm"]],
  [906,"Sunday brunch sprawl",17,["brand","medium","medium","motion","rhythm"]],
  [907,"Game day energy crowd shots",17,["people","fast","medium","thermal","rhythm"]],
  [908,"Late night menu neon",17,["brand","medium","medium","visual","closer"]],
  [909,"Happy hour transition day to night",17,["brand","medium","medium","visual","transition"]],
  [910,"Outdoor event tent atmosphere",17,["brand","medium","wide","visual","texture"]],
  [911,"St Patricks Day green theme",17,["brand","medium","medium","visual","rhythm"]],
  [912,"Cinco de Mayo celebration",17,["brand","medium","medium","visual","rhythm"]],
  [913,"Fourth of July fireworks dining",17,["space","fast","medium","thermal","rhythm"]],
  [914,"Halloween themed dining",17,["space","medium","medium","visual","rhythm"]],
  [915,"Thanksgiving feast spread",17,["brand","medium","wide","visual","rhythm"]],
  [916,"Christmas Eve dinner elegance",17,["brand","medium","medium","visual","rhythm"]],
  [917,"New Years Eve countdown cocktails",17,["drink","medium","medium","visual","rhythm"]],
  [918,"Super Bowl watch party",17,["brand","medium","medium","visual","rhythm"]],
  [919,"March Madness bracket dining",17,["space","medium","medium","visual","rhythm"]],
  [920,"Derby Day mint julep elegance",17,["drink","medium","medium","visual","rhythm"]],
  [921,"Mothers Day brunch special",17,["brand","medium","medium","motion","rhythm"]],
  [922,"Fathers Day steakhouse feature",17,["food","medium","medium","visual","rhythm"]],
  [923,"Graduation celebration dinner",17,["brand","medium","medium","visual","rhythm"]],
  [924,"Prom pre-dinner elegance",17,["brand","medium","medium","visual","rhythm"]],
  [925,"Wedding rehearsal dinner",17,["brand","medium","medium","visual","rhythm"]],
  [926,"Anniversary milestone celebration",17,["brand","medium","medium","tactile","rhythm"]],
  [927,"First date nervousness charm",17,["brand","medium","medium","visual","opener"]],
  [928,"Proposal dinner setup reveal",17,["gear","medium","medium","visual","opener"]],
  [929,"Birthday dessert parade",17,["food","medium","medium","visual","rhythm"]],
  [930,"Retirement dinner honor",17,["brand","medium","medium","visual","rhythm"]],
  [931,"Business lunch power dining",17,["space","medium","medium","visual","rhythm"]],
  [932,"Wine dinner pairing event",17,["drink","medium","medium","audio","rhythm"]],
  [933,"Whiskey tasting flight event",17,["drink","medium","aerial","motion","rhythm"]],
  [934,"Beer release tap event",17,["drink","medium","medium","visual","rhythm"]],
  [935,"Chef collaboration guest chef",17,["people","medium","medium","visual","rhythm"]],
  [936,"Farm dinner outdoor long table",17,["brand","medium","medium","visual","rhythm"]],
  [937,"Charity gala fundraiser dining",17,["space","medium","medium","visual","rhythm"]],
  [938,"Food festival booth energy",17,["food","fast","medium","visual","rhythm"]],
  [939,"Cooking class participant POV",17,["people","medium","medium","motion","rhythm"]],
  [940,"Menu launch new item debut",17,["brand","medium","medium","visual","rhythm"]],
  [941,"Seasonal menu transition",17,["brand","medium","medium","visual","transition"]],
  [942,"Restaurant anniversary celebration",17,["space","medium","medium","visual","rhythm"]],
  [943,"Grand opening ribbon cut",17,["brand","medium","medium","visual","opener"]],
  [944,"Renovation before after reveal",17,["brand","medium","medium","visual","opener"]],
  [945,"Award recognition plaque moment",17,["brand","medium","medium","visual","rhythm"]],
  [946,"Press event media coverage",17,["brand","medium","medium","visual","rhythm"]],
  [947,"Influencer hosted dinner content",17,["people","medium","medium","visual","rhythm"]],
  [948,"Private event buyout atmosphere",17,["brand","medium","wide","visual","texture"]],
  [949,"Catering setup off-site transformation",17,["gear","medium","medium","audio","rhythm"]],
  [950,"Food truck pop-up street energy",17,["food","fast","medium","audio","rhythm"]],
  [951,"Watermark subtle corner lock",18,["brand","slow","medium","visual","rhythm"]],
  [952,"Intro logo sting animation",18,["brand","medium","medium","visual","opener"]],
  [953,"End card with social handles",18,["brand","medium","medium","visual","closer"]],
  [954,"Lower third name and title",18,["brand","medium","medium","visual","rhythm"]],
  [955,"Branded color flash between cuts",18,["brand","fast","medium","visual","transition"]],
  [956,"Menu item spotlight with brand frame",18,["brand","medium","medium","visual","closer"]],
  [957,"Branded transition wipe",18,["brand","medium","medium","visual","transition"]],
  [958,"Social CTA overlay",18,["brand","medium","medium","visual","texture"]],
  [959,"Hashtag overlay integration",18,["brand","medium","medium","visual","texture"]],
  [960,"Website URL persistent footer",18,["brand","medium","medium","visual","rhythm"]],
  [961,"Phone number call-to-action",18,["brand","medium","medium","visual","rhythm"]],
  [962,"Address location card",18,["brand","medium","medium","visual","rhythm"]],
  [963,"Hours of operation overlay",18,["brand","medium","medium","visual","texture"]],
  [964,"Reservation link QR code",18,["brand","medium","medium","visual","rhythm"]],
  [965,"App download prompt",18,["brand","medium","medium","visual","rhythm"]],
  [966,"Loyalty program badge",18,["brand","medium","medium","visual","rhythm"]],
  [967,"Gift card promotion frame",18,["brand","medium","medium","motion","rhythm"]],
  [968,"Seasonal special branded callout",18,["brand","medium","medium","visual","closer"]],
  [969,"Limited time offer countdown brand",18,["brand","medium","medium","visual","closer"]],
  [970,"Happy hour times branded overlay",18,["brand","medium","medium","visual","texture"]],
  [971,"Daily special rotating brand frame",18,["brand","medium","medium","visual","closer"]],
  [972,"Chef signature brand mark",18,["people","medium","medium","visual","closer"]],
  [973,"Branded napkin coaster product shot",18,["brand","medium","medium","thermal","closer"]],
  [974,"Menu cover beauty shot branded",18,["brand","medium","medium","thermal","payoff"]],
  [975,"Exterior sign hero shot",18,["space","medium","medium","thermal","payoff"]],
  [976,"Branded vehicle wrap reveal",18,["brand","medium","medium","visual","opener"]],
  [977,"Uniform staff branded apparel",18,["people","medium","medium","visual","closer"]],
  [978,"Packaging branded to-go containers",18,["brand","medium","medium","visual","closer"]],
  [979,"Business card detail shot",18,["brand","medium","macro","thermal","texture"]],
  [980,"Branded merchandise display",18,["brand","medium","medium","visual","closer"]],
  [981,"Social media handle persistent tag",18,["brand","medium","medium","visual","rhythm"]],
  [982,"Review quote testimonial overlay",18,["people","medium","medium","visual","texture"]],
  [983,"Award badge display overlay",18,["brand","medium","medium","visual","texture"]],
  [984,"Press mention quote overlay",18,["brand","medium","medium","visual","texture"]],
  [985,"Rating score display animated",18,["brand","medium","medium","visual","rhythm"]],
  [986,"Before after renovation brand story",18,["brand","medium","medium","visual","closer"]],
  [987,"Founder story portrait branded",18,["brand","medium","medium","visual","closer"]],
  [988,"Mission statement text overlay",18,["brand","medium","medium","visual","texture"]],
  [989,"Values pillars graphic overlay",18,["brand","medium","medium","visual","texture"]],
  [990,"Team photo branded frame",18,["drink","medium","medium","thermal","closer"]],
  [991,"Timeline history brand evolution",18,["brand","medium","medium","visual","closer"]],
  [992,"Ingredient sourcing branded map",18,["food","medium","medium","visual","closer"]],
  [993,"Community involvement branded moment",18,["brand","medium","medium","visual","closer"]],
  [994,"Sustainability commitment branded",18,["brand","medium","medium","visual","closer"]],
  [995,"Partnership co-brand logo lock",18,["brand","medium","medium","visual","closer"]],
  [996,"Franchise location branded overview",18,["brand","medium","medium","visual","closer"]],
  [997,"Multi-location brand consistency",18,["brand","medium","medium","visual","closer"]],
  [998,"Brand voice text style branded captions",18,["brand","medium","medium","thermal","closer"]],
  [999,"Branded countdown teaser",18,["drink","medium","medium","visual","closer"]],
  [1000,"Brand anthem montage finale",18,["brand","fast","medium","visual","payoff"]],
  [1001,"Establishing reveal flight",19,["space","medium","wide","motion","opener"]],
  [1002,"Low orbit exterior building",19,["space","medium","aerial","motion","payoff"]],
  [1003,"Top-down property overview",19,["space","medium","wide","visual","rhythm"]],
  [1004,"Parallax altitude shift",19,["space","medium","medium","visual","transition"]],
  [1005,"Fly-through entrance approach",19,["space","medium","medium","tactile","opener"]],
  [1006,"Sunset golden hour aerial",19,["gear","medium","aerial","visual","rhythm"]],
  [1007,"Parking lot to rooftop vertical",19,["space","medium","medium","visual","rhythm"]],
  [1008,"Indoor mini-drone table skim",19,["gear","medium","aerial","visual","rhythm"]],
  [1009,"Drone reveal behind obstacle",19,["gear","medium","aerial","visual","opener"]],
  [1010,"Aerial time-lapse",19,["gear","fast","aerial","visual","rhythm"]],
  [1011,"Orbit around building exterior",19,["space","medium","aerial","motion","payoff"]],
  [1012,"Ascending crane sim from ground",19,["space","medium","medium","visual","closer"]],
  [1013,"Descending into courtyard garden",19,["space","medium","medium","visual","closer"]],
  [1014,"Following car to valet aerial",19,["people","medium","aerial","motion","rhythm"]],
  [1015,"Rooftop reveal ascending past edge",19,["space","medium","medium","visual","opener"]],
  [1016,"Waterfront property sweeping approach",19,["space","medium","wide","motion","opener"]],
  [1017,"Night aerial neon glow exterior",19,["space","medium","aerial","visual","texture"]],
  [1018,"Seasonal aerial fall foliage context",19,["gear","medium","aerial","visual","rhythm"]],
  [1019,"Snow-covered property winter aerial",19,["space","medium","wide","visual","rhythm"]],
  [1020,"Crowd aerial overhead event patio",19,["people","medium","aerial","visual","rhythm"]],
  [1021,"Straight-down geometric architecture",19,["space","medium","wide","visual","rhythm"]],
  [1022,"Dolly zoom aerial perspective shift",19,["gear","medium","aerial","motion","transition"]],
  [1023,"Cable cam sim along roofline",19,["space","medium","medium","visual","rhythm"]],
  [1024,"Reveal from behind signage aerial",19,["brand","medium","aerial","visual","opener"]],
  [1025,"Multi-property portfolio aerial tour",19,["space","medium","wide","visual","rhythm"]],
  [1026,"Construction progress aerial documentation",19,["gear","medium","aerial","visual","payoff"]],
  [1027,"Neighborhood context aerial wide",19,["gear","medium","wide","visual","rhythm"]],
  [1028,"Highway approach aerial wayfinding",19,["gear","medium","aerial","motion","opener"]],
  [1029,"Aerial to ground level continuous descent",19,["gear","medium","aerial","visual","rhythm"]],
  [1030,"Interior to exterior drone transition",19,["space","medium","aerial","visual","transition"]],
  [1031,"Terrace dining elevated perspective",19,["space","medium","medium","visual","rhythm"]],
  [1032,"Garden herb aerial close fly-by",19,["space","medium","close","motion","rhythm"]],
  [1033,"Poolside resort aerial establishing",19,["space","medium","wide","visual","opener"]],
  [1034,"Marina waterfront aerial approach",19,["gear","medium","aerial","motion","opener"]],
  [1035,"Mountain valley context establishing aerial",19,["gear","medium","wide","visual","opener"]],
  [1036,"Cityscape skyline with property focal",19,["space","medium","wide","visual","rhythm"]],
  [1037,"Agricultural field source aerial",19,["gear","medium","aerial","visual","rhythm"]],
  [1038,"Event tent aerial overhead coverage",19,["gear","medium","aerial","visual","rhythm"]],
  [1039,"Parking capacity aerial documentation",19,["space","medium","aerial","visual","rhythm"]],
  [1040,"Multi-angle aerial rapid sequence",19,["gear","fast","aerial","visual","rhythm"]],
  [1041,"Full 360 dining room capture",20,["space","medium","wide","visual","rhythm"]],
  [1042,"Tiny planet effect",20,["space","medium","medium","visual","rhythm"]],
  [1043,"Interactive hotspot tour",20,["space","medium","medium","thermal","rhythm"]],
  [1044,"360 kitchen chaos immersive",20,["space","fast","medium","visual","rhythm"]],
  [1045,"360 bar seated perspective",20,["space","medium","medium","visual","rhythm"]],
  [1046,"360 private event atmosphere",20,["space","medium","wide","visual","texture"]],
  [1047,"360 rooftop sunset panoramic",20,["space","medium","wide","motion","rhythm"]],
  [1048,"360 wine cellar immersive",20,["drink","medium","medium","visual","rhythm"]],
  [1049,"360 chef table perspective",20,["people","medium","medium","visual","rhythm"]],
  [1050,"360 event space walkthrough",20,["space","medium","medium","tactile","rhythm"]],
  [1051,"360 time-lapse full service",20,["space","fast","medium","thermal","rhythm"]],
  [1052,"VR dining experience preview",20,["space","medium","medium","visual","rhythm"]],
  [1053,"360 seasonal decor comparison",20,["space","medium","medium","visual","rhythm"]],
  [1054,"360 before after renovation",20,["space","medium","medium","visual","rhythm"]],
  [1055,"360 outdoor seating atmosphere",20,["space","medium","wide","visual","texture"]],
  [1056,"Interactive menu point-and-learn",20,["space","medium","medium","visual","rhythm"]],
  [1057,"360 lobby entrance experience",20,["space","medium","medium","visual","opener"]],
  [1058,"360 gaming floor atmosphere",20,["space","medium","wide","visual","texture"]],
  [1059,"360 pool area resort experience",20,["space","medium","medium","visual","rhythm"]],
  [1060,"360 meeting space configuration",20,["space","medium","medium","visual","rhythm"]],
  [1061,"360 suite room showcase",20,["space","medium","medium","visual","rhythm"]],
  [1062,"360 spa relaxation space",20,["space","medium","medium","visual","rhythm"]],
  [1063,"360 entertainment venue pre-show",20,["space","medium","wide","visual","rhythm"]],
  [1064,"360 parking facility wayfinding",20,["space","medium","medium","visual","rhythm"]],
  [1065,"360 fitness center tour",20,["space","medium","medium","visual","rhythm"]],
  [1066,"Point cloud property scan",21,["space","medium","wide","visual","rhythm"]],
  [1067,"Before after 3D comparison",21,["gear","medium","medium","visual","rhythm"]],
  [1068,"Digital twin walkthrough render",21,["gear","medium","medium","tactile","closer"]],
  [1069,"3D floor plan animated tour",21,["gear","medium","medium","visual","rhythm"]],
  [1070,"Photogrammetry dish sculpture",21,["food","medium","medium","thermal","payoff"]],
  [1071,"3D menu item rotating display",21,["gear","medium","medium","visual","rhythm"]],
  [1072,"Venue measurement visualization",21,["space","medium","wide","visual","rhythm"]],
  [1073,"Renovation planning 3D overlay",21,["gear","medium","medium","visual","texture"]],
  [1074,"Furniture layout 3D planning",21,["gear","medium","medium","visual","rhythm"]],
  [1075,"Historical reconstruction 3D model",21,["gear","medium","medium","visual","payoff"]],
  [1076,"Damage assessment 3D documentation",21,["gear","medium","medium","visual","rhythm"]],
  [1077,"Construction progress 3D scan series",21,["gear","medium","medium","visual","payoff"]],
  [1078,"Art installation 3D capture",21,["gear","medium","medium","visual","rhythm"]],
  [1079,"Custom fixture 3D documentation",21,["gear","medium","medium","visual","rhythm"]],
  [1080,"Landscape design 3D planning",21,["brand","medium","medium","visual","rhythm"]],
  [1081,"Kitchen layout 3D efficiency analysis",21,["space","medium","medium","visual","rhythm"]],
  [1082,"Event space 3D configuration tool",21,["space","medium","medium","visual","rhythm"]],
  [1083,"Brand environment 3D showcase",21,["brand","medium","medium","visual","closer"]],
  [1084,"Multi-floor 3D vertical tour",21,["gear","medium","medium","visual","rhythm"]],
  [1085,"Exterior facade 3D documentation",21,["space","medium","medium","visual","rhythm"]],
  [1086,"Interior detail 3D texture capture",21,["gear","medium","macro","tactile","texture"]],
  [1087,"Food display case 3D product spin",21,["food","medium","medium","motion","rhythm"]],
  [1088,"Bar setup 3D configuration",21,["space","medium","medium","visual","rhythm"]],
  [1089,"Table setting 3D product showcase",21,["gear","medium","medium","visual","rhythm"]],
  [1090,"Architectural detail 3D heritage",21,["gear","medium","macro","visual","texture"]],
  [1091,"Thermal reveal of hot dish",22,["food","medium","medium","thermal","opener"]],
  [1092,"Cold vs hot thermal comparison",22,["brand","medium","medium","thermal","rhythm"]],
  [1093,"Kitchen heat map",22,["space","medium","medium","thermal","rhythm"]],
  [1094,"HVAC efficiency visualization",22,["brand","medium","medium","visual","rhythm"]],
  [1095,"Cooking surface temperature gradient",22,["people","medium","medium","thermal","texture"]],
  [1096,"Beverage temperature perfect serve",22,["brand","medium","medium","thermal","payoff"]],
  [1097,"Walk-in cooler temperature verification",22,["brand","medium","medium","thermal","rhythm"]],
  [1098,"Dishwasher sanitization temperature",22,["food","medium","medium","thermal","rhythm"]],
  [1099,"Guest comfort zone mapping",22,["people","medium","medium","visual","rhythm"]],
  [1100,"Energy efficiency thermal audit",22,["brand","fast","medium","thermal","rhythm"]],
  [1101,"Infrared plating hot zone reveal",22,["brand","medium","medium","thermal","opener"]],
  [1102,"UV sanitation verification glow",22,["brand","medium","medium","visual","texture"]],
  [1103,"Multispectral freshness analysis",22,["brand","medium","medium","visual","rhythm"]],
  [1104,"Night vision security aesthetic",22,["brand","medium","medium","visual","closer"]],
  [1105,"Thermal cocktail ice vs spirit",22,["drink","medium","medium","thermal","rhythm"]],
  [1106,"Oven temperature gradient visual",22,["brand","medium","medium","thermal","rhythm"]],
  [1107,"Grill zone heat mapping",22,["brand","medium","medium","thermal","rhythm"]],
  [1108,"Cold chain delivery verification",22,["brand","medium","medium","thermal","rhythm"]],
  [1109,"Steam temperature visualization",22,["drink","medium","medium","thermal","rhythm"]],
  [1110,"Ambient temperature comfort mapping",22,["brand","medium","medium","thermal","texture"]],
  [1111,"Dual angle synchronized",23,["brand","fast","medium","visual","rhythm"]],
  [1112,"Picture-in-picture chef and dish",23,["food","medium","medium","visual","rhythm"]],
  [1113,"Three-camera interview setup",23,["gear","medium","medium","visual","rhythm"]],
  [1114,"Multicam cooking tutorial switcher",23,["people","medium","medium","visual","rhythm"]],
  [1115,"Live event multicam coverage",23,["brand","medium","medium","visual","rhythm"]],
  [1116,"Kitchen and dining room split",23,["space","medium","medium","visual","rhythm"]],
  [1117,"Chef cam plus overhead cam",23,["people","medium","aerial","visual","rhythm"]],
  [1118,"Guest reaction plus food cam",23,["food","medium","medium","visual","rhythm"]],
  [1119,"Bar cam plus dance floor cam",23,["space","medium","medium","visual","rhythm"]],
  [1120,"Before and after split renovation",23,["brand","medium","medium","visual","rhythm"]],
  [1121,"Multicam taste test multiple angles",23,["brand","medium","medium","visual","rhythm"]],
  [1122,"Time-synced multi-location same dish",23,["food","fast","medium","visual","rhythm"]],
  [1123,"Prep station multicam efficiency",23,["brand","medium","medium","visual","rhythm"]],
  [1124,"Service window pass multicam",23,["brand","medium","medium","thermal","rhythm"]],
  [1125,"Tableside service multicam coverage",23,["brand","medium","medium","thermal","rhythm"]],
  [1126,"Cocktail build multicam macro plus wide",23,["drink","medium","macro","visual","payoff"]],
  [1127,"Chef plus sous chef split screen",23,["people","medium","medium","visual","rhythm"]],
  [1128,"Indoor outdoor simultaneous atmosphere",23,["brand","medium","wide","visual","texture"]],
  [1129,"Multiple guest reactions synchronized",23,["people","fast","medium","visual","rhythm"]],
  [1130,"Kitchen to table journey multicam",23,["space","medium","medium","visual","rhythm"]],
  [1131,"Plating detail plus wide context",23,["brand","medium","macro","visual","payoff"]],
  [1132,"Ingredient to dish transformation multicam",23,["food","medium","medium","visual","rhythm"]],
  [1133,"Day to night transition multicam",23,["brand","medium","medium","visual","transition"]],
  [1134,"Seasonal menu comparison multicam",23,["brand","medium","medium","visual","rhythm"]],
  [1135,"Staff and guest perspective dual cam",23,["people","medium","medium","visual","rhythm"]],
  [1136,"This or That poll format",24,["brand","medium","medium","visual","rhythm"]],
  [1137,"Swipe carousel format",24,["brand","medium","medium","visual","transition"]],
  [1138,"Duet stitch response format",24,["brand","medium","medium","visual","rhythm"]],
  [1139,"Story-native vertical sequence",24,["brand","medium","medium","visual","rhythm"]],
  [1140,"Reel TikTok hook-first format",24,["brand","medium","medium","visual","opener"]],
  [1141,"Rate this dish 1-10 engagement",24,["food","medium","medium","visual","rhythm"]],
  [1142,"Guess the ingredient challenge",24,["food","medium","medium","visual","rhythm"]],
  [1143,"Menu item bracket tournament",24,["brand","medium","medium","visual","rhythm"]],
  [1144,"Tag a friend prompt",24,["people","medium","medium","visual","closer"]],
  [1145,"Save for later bookmark bait",24,["brand","medium","medium","visual","rhythm"]],
  [1146,"Comment your order engagement",24,["brand","medium","medium","visual","rhythm"]],
  [1147,"Share to story optimized format",24,["brand","medium","medium","visual","rhythm"]],
  [1148,"Collab post dual creator",24,["brand","medium","medium","visual","rhythm"]],
  [1149,"Pinned comment conversation starter",24,["brand","medium","medium","visual","opener"]],
  [1150,"Green screen background ready",24,["brand","medium","medium","visual","texture"]],
  [1151,"Trend audio native with food twist",24,["food","medium","medium","audio","closer"]],
  [1152,"POV you work here format",24,["brand","medium","medium","visual","rhythm"]],
  [1153,"Get ready with me restaurant edition",24,["space","medium","medium","visual","rhythm"]],
  [1154,"Day in my life chef server bartender",24,["people","medium","medium","visual","closer"]],
  [1155,"Unpopular opinion food take",24,["food","fast","medium","audio","rhythm"]],
  [1156,"Things you didnt know about our restaurant",24,["space","medium","medium","visual","rhythm"]],
  [1157,"Red flag green flag dining edition",24,["space","medium","medium","visual","rhythm"]],
  [1158,"Expectation vs reality food",24,["food","medium","medium","visual","closer"]],
  [1159,"Tutorial recipe format native",24,["food","medium","medium","visual","rhythm"]],
  [1160,"Storytime with cooking montage",24,["people","fast","medium","visual","rhythm"]],
  [1161,"Ranking every item on the menu",24,["brand","medium","medium","visual","rhythm"]],
  [1162,"Secret off-menu items reveal",24,["brand","medium","medium","visual","opener"]],
  [1163,"Staff picks favorites series",24,["people","medium","medium","visual","rhythm"]],
  [1164,"How to order like a regular",24,["brand","medium","medium","visual","rhythm"]],
  [1165,"Behind the name origin story",24,["brand","medium","medium","visual","rhythm"]],
  [1166,"Kitchen prep montage BTS",25,["space","fast","medium","visual","rhythm"]],
  [1167,"Equipment setup timelapse",25,["gear","fast","medium","visual","rhythm"]],
  [1168,"Candid staff moment",25,["people","medium","medium","visual","rhythm"]],
  [1169,"Delivery receiving dock",25,["brand","medium","medium","visual","rhythm"]],
  [1170,"Walk-in cooler reveal",25,["brand","medium","medium","thermal","opener"]],
  [1171,"Recipe development test kitchen",25,["food","medium","medium","visual","rhythm"]],
  [1172,"Menu design photoshoot BTS",25,["brand","medium","medium","thermal","rhythm"]],
  [1173,"Interior design selection process",25,["brand","medium","medium","visual","rhythm"]],
  [1174,"Staff training session",25,["people","medium","medium","visual","rhythm"]],
  [1175,"Health inspection preparation",25,["brand","medium","medium","visual","rhythm"]],
  [1176,"Morning market sourcing trip",25,["brand","medium","medium","visual","opener"]],
  [1177,"Wine selection cellar visit",25,["drink","medium","medium","visual","rhythm"]],
  [1178,"Coffee roasting process origin",25,["drink","medium","medium","visual","rhythm"]],
  [1179,"Bread baking overnight process",25,["food","medium","medium","visual","closer"]],
  [1180,"Fermentation aging patience process",25,["brand","medium","medium","visual","rhythm"]],
  [1181,"Butchery breakdown process",25,["brand","medium","medium","visual","rhythm"]],
  [1182,"Pasta making from flour to plate",25,["food","medium","medium","visual","payoff"]],
  [1183,"Chocolate tempering process",25,["brand","medium","medium","audio","rhythm"]],
  [1184,"Cheese aging cave visit",25,["food","medium","medium","visual","rhythm"]],
  [1185,"Foraging wild ingredients process",25,["food","medium","medium","visual","rhythm"]],
  [1186,"Fish market selection process",25,["brand","medium","medium","visual","rhythm"]],
  [1187,"Farm visit supplier relationship",25,["brand","medium","medium","visual","rhythm"]],
  [1188,"Equipment maintenance sharpening seasoning",25,["gear","medium","medium","visual","rhythm"]],
  [1189,"Table linen pressing preparation",25,["brand","medium","medium","tactile","rhythm"]],
  [1190,"Flower arrangement table setting",25,["brand","medium","medium","visual","rhythm"]],
  [1191,"Ice program block cutting carving",25,["brand","medium","medium","thermal","transition"]],
  [1192,"Uniform preparation pre-service",25,["brand","medium","medium","thermal","rhythm"]],
  [1193,"Sound system setup entertainment prep",25,["gear","medium","medium","audio","rhythm"]],
  [1194,"Lighting adjustment mood setting",25,["brand","medium","medium","visual","rhythm"]],
  [1195,"Final walkthrough pre-service check",25,["brand","medium","medium","tactile","closer"]],
  [1196,"Family meal staff feeding",25,["people","medium","medium","visual","rhythm"]],
  [1197,"Specials board creation process",25,["brand","medium","medium","visual","rhythm"]],
  [1198,"Social media content creation meta BTS",25,["brand","medium","medium","visual","rhythm"]],
  [1199,"Closing cleanup end of night process",25,["brand","medium","medium","visual","closer"]],
  [1200,"Opening ritual first light first coffee",25,["drink","medium","medium","visual","opener"]],
];

const CATEGORIES = [
  { id: 1, name: "Typography & Lettering", icon: "✏️" },
  { id: 2, name: "Reveal & Transition", icon: "🎭" },
  { id: 3, name: "Camera Movements", icon: "🎥" },
  { id: 4, name: "Lighting Techniques", icon: "💡" },
  { id: 5, name: "Motion & Time", icon: "⏱️" },
  { id: 6, name: "Texture & Material", icon: "🧱" },
  { id: 7, name: "Practical Effects", icon: "🔥" },
  { id: 8, name: "Graphic Treatments", icon: "🎨" },
  { id: 9, name: "Narrative Frameworks", icon: "📖" },
  { id: 10, name: "Color & Mood", icon: "🌈" },
  { id: 11, name: "Sound-Visual Sync", icon: "🎵" },
  { id: 12, name: "Food Cinematography", icon: "🍽️" },
  { id: 13, name: "Architecture & Space", icon: "🏛️" },
  { id: 14, name: "Human & Lifestyle", icon: "👤" },
  { id: 15, name: "Digital & AI-Enhanced", icon: "🤖" },
  { id: 16, name: "Analog & Retro", icon: "📼" },
  { id: 17, name: "Seasonal & Event", icon: "🎉" },
  { id: 18, name: "Logo & Brand", icon: "™️" },
  { id: 19, name: "Aerial & Drone", icon: "🚁" },
  { id: 20, name: "360° & Immersive", icon: "🌐" },
  { id: 21, name: "Photogrammetry & 3D", icon: "📐" },
  { id: 22, name: "Thermal & Specialty", icon: "🌡️" },
  { id: 23, name: "Multi-Camera", icon: "📹" },
  { id: 24, name: "Social-Native", icon: "📱" },
  { id: 25, name: "BTS & Process", icon: "🎬" },
];

const INDUSTRIES = [
  { id: "restaurant", name: "Restaurant", icon: "🍽️", catWeights: { 7: 1.5, 9: 1.4, 12: 1.8, 14: 1.3, 11: 1.2 } },
  { id: "bar", name: "Bar / Lounge", icon: "🍸", catWeights: { 4: 1.5, 7: 1.4, 11: 1.5, 14: 1.3, 5: 1.2 } },
  { id: "hotel", name: "Hotel / Resort", icon: "🏨", catWeights: { 13: 1.6, 19: 1.5, 4: 1.3, 17: 1.3, 14: 1.2 } },
  { id: "cafe", name: "Café / Coffee", icon: "☕", catWeights: { 12: 1.5, 6: 1.4, 16: 1.3, 14: 1.2, 10: 1.3 } },
  { id: "brewery", name: "Brewery / Distillery", icon: "🍺", catWeights: { 7: 1.5, 9: 1.4, 25: 1.5, 13: 1.3, 5: 1.2 } },
  { id: "casino", name: "Casino / Entertainment", icon: "🎰", catWeights: { 2: 1.4, 4: 1.5, 5: 1.4, 8: 1.3, 17: 1.3 } },
  { id: "catering", name: "Catering / Events", icon: "🎪", catWeights: { 17: 1.6, 14: 1.5, 13: 1.3, 9: 1.3, 19: 1.2 } },
  { id: "retail", name: "Retail / Storefront", icon: "🏪", catWeights: { 13: 1.4, 18: 1.5, 1: 1.4, 8: 1.3, 24: 1.3 } },
  { id: "other", name: "Other", icon: "✨", catWeights: {} },
];

const PERSONALITIES = [
  { id: "luxury", name: "Luxury / Premium", tags: ["slow","macro","visual","payoff"], catBoost: { 4: 1.3, 10: 1.3, 12: 1.2 } },
  { id: "casual", name: "Casual / Approachable", tags: ["medium","close","visual","rhythm"], catBoost: { 9: 1.3, 14: 1.3, 24: 1.2 } },
  { id: "energetic", name: "Energetic / Bold", tags: ["fast","medium","motion","rhythm"], catBoost: { 5: 1.3, 11: 1.3, 2: 1.2 } },
  { id: "intimate", name: "Intimate / Cozy", tags: ["slow","close","visual","texture"], catBoost: { 4: 1.4, 6: 1.3, 10: 1.3 } },
  { id: "modern", name: "Modern / Cutting-Edge", tags: ["medium","medium","visual","rhythm"], catBoost: { 15: 1.4, 8: 1.3, 24: 1.3 } },
  { id: "rustic", name: "Rustic / Handcrafted", tags: ["slow","close","tactile","texture"], catBoost: { 6: 1.4, 16: 1.3, 7: 1.2 } },
  { id: "playful", name: "Playful / Fun", tags: ["fast","close","visual","rhythm"], catBoost: { 2: 1.3, 5: 1.2, 24: 1.4 } },
  { id: "editorial", name: "Editorial / Refined", tags: ["slow","medium","visual","opener"], catBoost: { 10: 1.4, 3: 1.3, 16: 1.2 } },
];

const AUDIENCES = [
  { id: "genz", name: "Gen Z (18-26)", platformBias: { tiktok: 1.4, instagram: 1.3 }, catBoost: { 24: 1.5, 5: 1.2, 11: 1.2 } },
  { id: "millennial", name: "Millennials (27-42)", platformBias: { instagram: 1.4, youtube: 1.2 }, catBoost: { 9: 1.2, 12: 1.2, 14: 1.2 } },
  { id: "genx", name: "Gen X (43-58)", platformBias: { youtube: 1.3, facebook: 1.3 }, catBoost: { 9: 1.3, 13: 1.2, 16: 1.2 } },
  { id: "boomer", name: "Boomers (59+)", platformBias: { youtube: 1.3, facebook: 1.4 }, catBoost: { 9: 1.4, 13: 1.3, 12: 1.2 } },
  { id: "families", name: "Families", platformBias: { youtube: 1.3, facebook: 1.3 }, catBoost: { 14: 1.4, 17: 1.3, 9: 1.2 } },
  { id: "foodies", name: "Foodies / Enthusiasts", platformBias: { instagram: 1.4, tiktok: 1.3 }, catBoost: { 12: 1.5, 7: 1.3, 11: 1.3 } },
  { id: "business", name: "Business / Corporate", platformBias: { linkedin: 1.4, youtube: 1.3 }, catBoost: { 13: 1.3, 18: 1.3, 3: 1.2 } },
  { id: "tourists", name: "Tourists / Visitors", platformBias: { instagram: 1.3, tiktok: 1.3 }, catBoost: { 19: 1.4, 13: 1.3, 17: 1.2 } },
];

const PLATFORMS = [
  { id: "instagram", name: "Instagram", icon: "📸" },
  { id: "tiktok", name: "TikTok", icon: "🎵" },
  { id: "youtube", name: "YouTube", icon: "▶️" },
  { id: "facebook", name: "Facebook", icon: "📘" },
  { id: "linkedin", name: "LinkedIn", icon: "💼" },
  { id: "website", name: "Website / Embed", icon: "🌐" },
];

const MOODS = [
  { id: "candlelight", name: "Candlelight Evening", icon: "🕯️", tags: ["slow","close","visual","texture"] },
  { id: "highenergy", name: "High Energy", icon: "⚡", tags: ["fast","medium","motion","rhythm"] },
  { id: "brunch", name: "Sunday Brunch", icon: "🥂", tags: ["slow","wide","visual","opener"] },
  { id: "latenight", name: "Late Night", icon: "🌙", tags: ["medium","close","visual","rhythm"] },
  { id: "celebration", name: "Celebration", icon: "🎉", tags: ["fast","wide","audio","closer"] },
  { id: "craft", name: "Craft & Process", icon: "🔬", tags: ["slow","macro","visual","texture"] },
  { id: "social", name: "Social Buzz", icon: "📱", tags: ["fast","close","visual","rhythm"] },
  { id: "elegant", name: "Elegant & Refined", icon: "✨", tags: ["slow","medium","visual","payoff"] },
];

const DURATIONS = [
  { id: "15", name: "15s", shots: 4, label: "Quick Hit" },
  { id: "30", name: "30s", shots: 7, label: "Standard Spot" },
  { id: "60", name: "60s", shots: 12, label: "Full Feature" },
  { id: "90", name: "90s", shots: 16, label: "Mini Doc" },
];

// ─── MATCHING ENGINE ───
function computeBrandScores(profile) {
  const catScores = {};
  CATEGORIES.forEach(c => { catScores[c.id] = 1.0; });
  const ind = INDUSTRIES.find(i => i.id === profile.industry);
  if (ind) Object.entries(ind.catWeights).forEach(([k, w]) => { catScores[parseInt(k)] *= w; });
  (profile.personalities || []).forEach(pId => {
    const p = PERSONALITIES.find(pp => pp.id === pId);
    if (p) Object.entries(p.catBoost).forEach(([k, w]) => { catScores[parseInt(k)] *= w; });
  });
  (profile.audiences || []).forEach(aId => {
    const a = AUDIENCES.find(aa => aa.id === aId);
    if (a) Object.entries(a.catBoost).forEach(([k, w]) => { catScores[parseInt(k)] *= w; });
  });
  return catScores;
}

function scoreStyle(style, catScores, profile, mood = null) {
  const [id, name, catId, tags] = style;
  let score = catScores[catId] || 1.0;
  const pTags = (profile.personalities || []).flatMap(pId => {
    const p = PERSONALITIES.find(pp => pp.id === pId);
    return p ? p.tags : [];
  });
  score *= 1 + (tags.filter(t => pTags.includes(t)).length * 0.15);
  if (mood) {
    const m = MOODS.find(mm => mm.id === mood);
    if (m) score *= 1 + (tags.filter(t => m.tags.includes(t)).length * 0.2);
  }
  // ── Offerings-based boosting ──
  const nl = name.toLowerCase();
  // Boost food styles if menu items detected
  if ((profile.menuItems || []).length > 0 && tags[0] === "food") score *= 1.15;
  // Boost drink styles if drinks detected
  const hasDrinks = (profile.menuItems || []).some(m => m.category === "drink");
  if (hasDrinks && tags[0] === "drink") score *= 1.2;
  // Boost cocktail-specific if cocktails found
  const hasCocktails = (profile.menuItems || []).some(m =>
    /cocktail|martini|margarita|old fashioned|manhattan|mojito|negroni|daiquiri/i.test(m.name));
  if (hasCocktails && /cocktail|pour|shake|muddle|garnish|spirit|mix/i.test(nl)) score *= 1.25;
  // Boost space/aerial if outdoor spaces detected
  const hasOutdoor = (profile.spaces || []).some(s => /patio|rooftop|terrace|garden|outdoor|deck|pool/i.test(s));
  if (hasOutdoor && (catId === 19 || /aerial|outdoor|patio|rooftop|exterior|garden/i.test(nl))) score *= 1.3;
  // Boost BTS/process if kitchen/prep spaces detected
  const hasKitchen = (profile.spaces || []).some(s => /kitchen|prep|back of house|commissary/i.test(s));
  if (hasKitchen && catId === 25) score *= 1.2;
  // Boost food cinematography for specific cuisine
  const hasSushi = (profile.cuisineTypes || []).some(c => /japanese|sushi|ramen|izakaya/i.test(c));
  if (hasSushi && /sushi|chopstick|ramen|bao|gyoza|dumpling/i.test(nl)) score *= 1.4;
  const hasPasta = (profile.cuisineTypes || []).some(c => /italian|pasta|pizza|trattoria/i.test(c));
  if (hasPasta && /pasta|pizza|risotto|focaccia|tiramisu|gelato/i.test(nl)) score *= 1.4;
  const hasMexican = (profile.cuisineTypes || []).some(c => /mexican|taco|tex-mex|latin/i.test(c));
  if (hasMexican && /taco|salsa|guac|tortilla|margarita|cilantro/i.test(nl)) score *= 1.4;
  const hasSeafood = (profile.cuisineTypes || []).some(c => /seafood|fish|shellfish|oyster|sushi/i.test(c));
  if (hasSeafood && /oyster|lobster|shrimp|crab|fish|ceviche|mussel|seafood|raw bar/i.test(nl)) score *= 1.4;
  const hasBBQ = (profile.cuisineTypes || []).some(c => /bbq|barbecue|smokehouse|grill/i.test(c));
  if (hasBBQ && /smoke|grill|sear|char|bark|rib|brisket/i.test(nl)) score *= 1.4;
  const hasBakery = (profile.cuisineTypes || []).some(c => /bakery|pastry|bread|patisserie/i.test(c));
  if (hasBakery && /bread|dough|pastry|cake|sourdough|bake|flour|oven/i.test(nl)) score *= 1.4;
  // Boost event styles if catering/events service
  const hasEvents = (profile.serviceTypes || []).some(s => /cater|event|banquet|wedding|private/i.test(s));
  if (hasEvents && catId === 17) score *= 1.3;
  // Boost social-native if takeout/delivery detected
  const hasDelivery = (profile.serviceTypes || []).some(s => /deliver|takeout|to-go|pickup|curbside/i.test(s));
  if (hasDelivery && catId === 24) score *= 1.2;
  // Price tier boost
  if (profile.priceTier === "fine" || profile.priceTier === "premium") {
    if (/tableside|sommelier|truffle|wagyu|lobster|champagne|crystal|candle|linen/i.test(nl)) score *= 1.3;
  }
  if (profile.priceTier === "budget" || profile.priceTier === "mid") {
    if (/fun|casual|quick|street|counter|pop|bright|energy/i.test(nl)) score *= 1.2;
  }
  // Daypart boost
  const hasLateNight = (profile.dayparts || []).includes("late-night");
  if (hasLateNight && /neon|night|dark|glow|midnight|late/i.test(nl)) score *= 1.2;
  const hasBrunch = (profile.dayparts || []).includes("brunch");
  if (hasBrunch && /brunch|morning|golden hour|bright|airy|mimosa/i.test(nl)) score *= 1.2;
  // Private dining / bar specific
  const hasPrivateDining = (profile.spaces || []).some(s => /private|vip|cellar|chef.?s table/i.test(s));
  if (hasPrivateDining && /private|cellar|intimate|chef.?s table|exclusive/i.test(nl)) score *= 1.3;
  const hasBar = (profile.spaces || []).some(s => /\bbar\b|lounge|taproom|cocktail/i.test(s));
  if (hasBar && /bar|cocktail|pour|tap|bottle|spirit|mix/i.test(nl)) score *= 1.2;

  return { id, name, catId, tags, score };
}

function getMatchedStyles(profile, mood = null) {
  const catScores = computeBrandScores(profile);
  return STYLES.map(s => scoreStyle(s, catScores, profile, mood)).sort((a, b) => b.score - a.score);
}

const BEATS = {
  hook: { name: "Hook", icon: "🔥", tags: ["fast","close","payoff","opener"] },
  establish: { name: "Establish", icon: "🏛️", tags: ["slow","wide","opener","visual"] },
  hero: { name: "Hero Shot", icon: "⭐", tags: ["slow","close","payoff","visual"] },
  rhythm: { name: "Rhythm", icon: "🎵", tags: ["medium","rhythm","motion","audio"] },
  texture: { name: "Texture", icon: "🔬", tags: ["slow","macro","texture","tactile"] },
  energy: { name: "Energy", icon: "⚡", tags: ["fast","medium","rhythm","motion"] },
  people: { name: "People", icon: "👤", tags: ["medium","close","visual","closer"] },
  closer: { name: "Closer", icon: "🎬", tags: ["slow","medium","closer","visual"] },
};

const BEAT_SEQ = {
  4: ["hook","hero","texture","closer"],
  7: ["hook","establish","hero","rhythm","texture","energy","closer"],
  12: ["hook","establish","rhythm","hero","texture","rhythm","energy","people","hero","texture","rhythm","closer"],
  16: ["hook","establish","rhythm","hero","texture","rhythm","people","energy","hero","texture","rhythm","people","energy","hero","texture","closer"],
};

function generateStoryboard(profile, mood, shotCount) {
  const catScores = computeBrandScores(profile);
  const seq = BEAT_SEQ[shotCount] || BEAT_SEQ[7];
  const used = new Set();
  return seq.map(beatKey => {
    const beat = BEATS[beatKey];
    const scored = STYLES.map(s => {
      const base = scoreStyle(s, catScores, profile, mood);
      base.score *= 1 + (s[3].filter(t => beat.tags.includes(t)).length * 0.25);
      if (used.has(s[0])) base.score *= 0.1;
      return base;
    }).sort((a, b) => b.score - a.score);
    const pool = scored.slice(0, 10);
    const totalW = pool.reduce((s, p) => s + p.score, 0);
    let r = Math.random() * totalW;
    let pick = pool[0];
    for (const p of pool) { r -= p.score; if (r <= 0) { pick = p; break; } }
    used.add(pick.id);
    return { ...pick, beat: beatKey, beatName: beat.name, beatIcon: beat.icon };
  });
}

function hexToHSL(hex) {
  let r = parseInt(hex.slice(1,3),16)/255, g = parseInt(hex.slice(3,5),16)/255, b = parseInt(hex.slice(5,7),16)/255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h, s, l = (max+min)/2;
  if (max===min) { h=s=0; } else {
    const d=max-min; s=l>0.5?d/(2-max-min):d/(max+min);
    switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break;}
  }
  return { h: Math.round(h*360), s: Math.round(s*100), l: Math.round(l*100) };
}

// ─── APP ───
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [wizStep, setWizStep] = useState(0);
  const [profile, setProfile] = useState({
    businessName: "", industry: "", personalities: [], audiences: [], platforms: [],
    colorPrimary: "#1a1a2e", colorSecondary: "#16213e", colorAccent: "#e94560",
    musicGenres: "", description: "", venues: [{ name: "", type: "" }],
    // Offerings extracted from uploads
    menuItems: [], // [{name, category}] - dishes, drinks, specials
    serviceTypes: [], // dine-in, takeout, catering, delivery, etc.
    spaces: [], // bar, patio, private room, rooftop, etc.
    cuisineTypes: [], // italian, american, fusion, etc.
    priceTier: "", // budget, mid, premium, fine
    dayparts: [], // breakfast, lunch, dinner, late-night, brunch
    signatures: [], // signature items / specialties
  });
  const [dashMode, setDashMode] = useState("browse");
  const [mood, setMood] = useState(null);
  const [duration, setDuration] = useState(null);
  const [storyboard, setStoryboard] = useState(null);
  const [shotList, setShotList] = useState([]);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState(null);
  const [browseLimit, setBrowseLimit] = useState(50);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const up = useCallback((k, v) => setProfile(p => ({ ...p, [k]: v })), []);
  const tog = useCallback((k, v) => setProfile(p => ({ ...p, [k]: p[k].includes(v) ? p[k].filter(x => x !== v) : [...p[k], v] })), []);
  const addVenue = useCallback(() => setProfile(p => ({ ...p, venues: [...p.venues, { name: "", type: "" }] })), []);
  const upVenue = useCallback((i, f, v) => setProfile(p => { const vs = [...p.venues]; vs[i] = { ...vs[i], [f]: v }; return { ...p, venues: vs }; }), []);
  const rmVenue = useCallback((i) => setProfile(p => ({ ...p, venues: p.venues.filter((_, j) => j !== i) })), []);

  const matched = useMemo(() => getMatchedStyles(profile, mood), [profile, mood]);
  const filtered = useMemo(() => {
    let s = matched;
    if (catFilter) s = s.filter(st => st.catId === catFilter);
    if (search) { const q = search.toLowerCase(); s = s.filter(st => st.name.toLowerCase().includes(q)); }
    return s;
  }, [matched, catFilter, search]);

  const addShot = useCallback((s, note = "") => setShotList(p => [...p, { ...s, note, addedAt: Date.now() }]), []);
  const rmShot = useCallback((i) => setShotList(p => p.filter((_, j) => j !== i)), []);

  const doGen = useCallback(() => {
    if (!mood || !duration) return;
    setStoryboard(generateStoryboard(profile, mood, DURATIONS.find(d => d.id === duration).shots));
  }, [profile, mood, duration]);

  const ac = profile.colorAccent || "#e94560";
  const acH = hexToHSL(ac);

  // ─── CLIENT-SIDE BRAND ANALYSIS (no API, no cost) ───

  // Extract dominant colors from an image using canvas
  const extractColorsFromImage = useCallback((imgSrc) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const size = 100; // Sample at small size for speed
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, size, size);
        const data = ctx.getImageData(0, 0, size, size).data;

        // Bucket colors
        const buckets = {};
        for (let i = 0; i < data.length; i += 4) {
          const r = Math.round(data[i] / 32) * 32;
          const g = Math.round(data[i+1] / 32) * 32;
          const b = Math.round(data[i+2] / 32) * 32;
          const a = data[i+3];
          if (a < 128) continue; // Skip transparent
          const key = `${r},${g},${b}`;
          buckets[key] = (buckets[key] || 0) + 1;
        }

        const sorted = Object.entries(buckets).sort((a, b) => b[1] - a[1]);
        const toHex = (rgb) => {
          const [r,g,b] = rgb.split(",").map(Number);
          return "#" + [r,g,b].map(c => Math.min(255, c).toString(16).padStart(2, "0")).join("");
        };

        // Get top 3 distinct colors (skip very similar ones)
        const colors = [];
        for (const [rgb] of sorted) {
          const hex = toHex(rgb);
          if (colors.length >= 3) break;
          const [r,g,b] = rgb.split(",").map(Number);
          // Skip near-white and near-black for accent
          const brightness = (r + g + b) / 3;
          if (colors.length === 0) { colors.push(hex); continue; } // darkest/most common is primary
          // Check it's different enough from existing
          const isDifferent = colors.every(existing => {
            const [er,eg,eb] = existing.slice(1).match(/.{2}/g).map(h => parseInt(h, 16));
            return Math.abs(r-er) + Math.abs(g-eg) + Math.abs(b-eb) > 80;
          });
          if (isDifferent) colors.push(hex);
        }

        while (colors.length < 3) colors.push(colors.length === 0 ? "#1a1a2e" : colors.length === 1 ? "#16213e" : "#e94560");
        resolve(colors);
      };
      img.onerror = () => resolve(["#1a1a2e", "#16213e", "#e94560"]);
      img.src = imgSrc;
    });
  }, []);

  // Extract text from PDF using pdf.js
  const extractPDFText = useCallback(async (arrayBuffer) => {
    try {
      // Dynamically load pdf.js if not present
      if (!window.pdfjsLib) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      }
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let text = "";
      for (let i = 1; i <= Math.min(pdf.numPages, 20); i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(" ") + "\n";
      }
      return text;
    } catch (e) {
      console.error("PDF parse error:", e);
      return "";
    }
  }, []);

  // Keyword-based brand intelligence engine
  const analyzeText = useCallback((text) => {
    const t = text.toLowerCase();
    const result = {
      businessName: "",
      industry: "other",
      personalities: [],
      audiences: [],
      platforms: [],
      colorPrimary: "#1a1a2e",
      colorSecondary: "#16213e",
      colorAccent: "#e94560",
      musicGenres: "",
      description: "",
      venues: [],
    };

    // ── Extract business name (first capitalized multi-word phrase, or title-like patterns)
    const namePatterns = [
      /(?:welcome to|about|introducing|presenting)\s+([A-Z][A-Za-z'']+(?:\s+[A-Z&][A-Za-z'']*){0,4})/,
      /^([A-Z][A-Za-z'']+(?:\s+[A-Z&][A-Za-z'']*){1,4})\s*(?:\n|$|—|-|:|\||brand)/m,
      /(?:brand|company|business|restaurant|bar|hotel|cafe|venue)\s*(?:name)?(?:\s*[:=]\s*|\s+is\s+)([A-Z][A-Za-z'']+(?:\s+[A-Za-z''&]*){0,4})/i,
    ];
    for (const pat of namePatterns) {
      const m = text.match(pat);
      if (m && m[1] && m[1].length > 2 && m[1].length < 60) {
        result.businessName = m[1].trim();
        break;
      }
    }

    // ── Industry detection
    const industryKeywords = {
      restaurant: /restaurant|dining|eatery|bistro|trattoria|brasserie|steakhouse|grill|kitchen|chef|menu|dine|entree|appetizer|dessert|fine dining|casual dining/,
      bar: /\bbar\b|lounge|taproom|cocktail|mixolog|nightclub|pub|tavern|speakeasy|happy hour|drink menu|craft cocktail/,
      hotel: /hotel|resort|suite|lobby|concierge|hospitality|lodging|accommodation|check-in|guest room|amenities|spa|pool/,
      cafe: /cafe|café|coffee|espresso|latte|barista|roast|bakery|pastry|brunch spot/,
      brewery: /brewery|distillery|taphouse|craft beer|brewing|ferment|barrel|hops|ale|lager|ipa|whiskey|bourbon|spirits/,
      casino: /casino|gaming|slot|poker|blackjack|roulette|wager|jackpot|dice|betting|entertainment venue/,
      catering: /catering|event\s*(?:space|venue|planning)|banquet|wedding|private.*dining|reception|corporate.*event/,
      retail: /retail|store|shop|boutique|merchan|storefront|e-commerce|product.*line/,
    };
    let bestIndustry = "other", bestCount = 0;
    for (const [ind, pat] of Object.entries(industryKeywords)) {
      const matches = (t.match(pat) || []).length;
      if (matches > bestCount) { bestCount = matches; bestIndustry = ind; }
    }
    result.industry = bestIndustry;

    // ── Personality detection
    const personalityKeywords = {
      luxury: /luxury|premium|upscale|elegant|sophisticated|refined|exclusive|high-end|prestige|opulent|fine|curated/,
      casual: /casual|relaxed|laid-back|approachable|friendly|comfortable|easy-going|chill|welcoming|neighborhood/,
      energetic: /energetic|vibrant|dynamic|exciting|bold|lively|electric|high-energy|pumping|buzz|thrill/,
      intimate: /intimate|cozy|warm|romantic|quiet|secluded|private|candlelit|personal|snug|tucked/,
      modern: /modern|contemporary|innovative|cutting-edge|sleek|minimalist|clean|forward|tech|digital/,
      rustic: /rustic|handcraft|artisan|homemade|farm|country|ranch|wood|barn|heritage|tradition|old-world/,
      playful: /playful|fun|whimsical|colorful|quirky|creative|eclectic|unique|unexpected|adventurous/,
      editorial: /editorial|stylish|aesthetic|curated|designed|architectural|visual|artistic|gallery|fashion/,
    };
    const personalityCounts = {};
    for (const [pers, pat] of Object.entries(personalityKeywords)) {
      personalityCounts[pers] = (t.match(pat) || []).length;
    }
    result.personalities = Object.entries(personalityCounts)
      .filter(([, c]) => c > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([p]) => p);

    // ── Audience detection
    const audienceKeywords = {
      genz: /gen z|gen-z|young|tiktok|viral|trend|18-2[0-9]|college|student|social media native/,
      millennial: /millennial|instagram|brunch|foodie|experience|avocado|craft|artisan|27-4|28-4|30-4/,
      genx: /gen x|gen-x|established|professional|mature|classic|43-5|45-5|50-5/,
      boomer: /boomer|senior|retiree|tradition|legacy|classic|fine dining|old-fashioned|60\+|65\+/,
      families: /famil|kid|child|parent|all ages|high chair|children.*menu|kid-friendly/,
      foodies: /foodie|culinary|gastronom|connoisseur|tasting|chef.?driven|farm.to.table|michelin|james beard/,
      business: /business|corporate|executive|meeting|conference|power lunch|private dining|networking/,
      tourists: /tourist|visitor|travel|destination|landmark|must-visit|bucket list|trip advisor|tripadvisor/,
    };
    const audienceCounts = {};
    for (const [aud, pat] of Object.entries(audienceKeywords)) {
      audienceCounts[aud] = (t.match(pat) || []).length;
    }
    result.audiences = Object.entries(audienceCounts)
      .filter(([, c]) => c > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([a]) => a);

    // ── Platform detection
    const platformKeywords = {
      instagram: /instagram|ig\b|insta\b|@|reels|stories|feed|grid/,
      tiktok: /tiktok|tik tok|short-form|viral|duet|stitch/,
      youtube: /youtube|video|vlog|channel|subscribe|long-form/,
      facebook: /facebook|fb\b|meta\b|community|group|page/,
      linkedin: /linkedin|professional|b2b|corporate|networking/,
      website: /website|web|site|homepage|landing page|seo|blog|domain/,
    };
    for (const [plat, pat] of Object.entries(platformKeywords)) {
      if (pat.test(t)) result.platforms.push(plat);
    }

    // ── Color extraction from text
    const hexMatches = text.match(/#[0-9a-fA-F]{6}\b/g) || [];
    if (hexMatches.length >= 3) {
      result.colorPrimary = hexMatches[0];
      result.colorSecondary = hexMatches[1];
      result.colorAccent = hexMatches[2];
    } else if (hexMatches.length > 0) {
      result.colorAccent = hexMatches[0];
    }
    // Also check for named colors
    const colorWords = {
      red: "#c0392b", crimson: "#dc143c", scarlet: "#ff2400",
      blue: "#2980b9", navy: "#1a237e", royal: "#4169e1", cobalt: "#0047ab",
      green: "#27ae60", emerald: "#50c878", sage: "#87ae73", olive: "#556b2f",
      gold: "#d4a017", amber: "#ffbf00", copper: "#b87333",
      purple: "#8e44ad", violet: "#7b1fa2", plum: "#8e4585",
      black: "#1a1a1a", charcoal: "#333333",
      teal: "#008080", turquoise: "#40e0d0", cyan: "#00bcd4",
      coral: "#ff7f50", salmon: "#fa8072", rose: "#e91e63", pink: "#e91e63",
      burgundy: "#800020", maroon: "#800000", wine: "#722f37",
      slate: "#708090", silver: "#c0c0c0", gray: "#808080",
      cream: "#fffdd0", ivory: "#fffff0", tan: "#d2b48c",
    };
    if (hexMatches.length < 3) {
      const foundColors = [];
      for (const [name, hex] of Object.entries(colorWords)) {
        const pat = new RegExp("\\b" + name + "\\b", "i");
        if (pat.test(t) && !foundColors.includes(hex)) foundColors.push(hex);
      }
      if (foundColors.length > 0 && hexMatches.length < 1) result.colorAccent = foundColors[0];
      if (foundColors.length > 1) result.colorSecondary = foundColors[1];
      if (foundColors.length > 2) result.colorPrimary = foundColors[2];
    }

    // ── Music/vibe keywords
    const musicWords = [];
    const musicPatterns = {
      jazz: /jazz/, "lo-fi": /lo-?fi/, rock: /rock\b/, acoustic: /acoustic/,
      electronic: /electronic|edm|house|techno/, "r&b": /r&b|r\s*&\s*b|soul/,
      indie: /indie/, pop: /pop\b/, classical: /classical|orchestr/,
      country: /country/, blues: /blues/, latin: /latin|salsa|reggaeton/,
      ambient: /ambient|chill|lounge/, hip: /hip.?hop|rap/,
    };
    for (const [genre, pat] of Object.entries(musicPatterns)) {
      if (pat.test(t)) musicWords.push(genre);
    }
    result.musicGenres = musicWords.join(", ");

    // ── Venue extraction
    const venuePatterns = [
      /(?:our|the)\s+([\w\s''&]+?)\s+(?:restaurant|bar|lounge|cafe|hotel|venue|room|space|kitchen|dining room|taproom|patio)/gi,
      /(?:location|venue|outlet|space)\s*[:=]\s*([\w\s''&]+)/gi,
    ];
    const venueSet = new Set();
    for (const pat of venuePatterns) {
      let m;
      while ((m = pat.exec(text)) !== null) {
        const name = m[1].trim();
        if (name.length > 2 && name.length < 50) venueSet.add(name);
      }
    }
    result.venues = [...venueSet].map(v => ({ name: v, type: "" }));
    if (result.venues.length === 0 && result.businessName) {
      result.venues = [{ name: result.businessName, type: "" }];
    }

    // ── Description (first 2-3 sentences that seem descriptive)
    const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 30 && s.length < 300);
    const descriptive = sentences.filter(s => {
      const sl = s.toLowerCase();
      return /we |our |is a |offers |features |serving |providing |known for |specializ|experience|atmosphere|community/.test(sl);
    });
    result.description = descriptive.slice(0, 2).join(". ").trim();
    if (result.description && !result.description.endsWith(".")) result.description += ".";

    // ── Defaults
    if (result.personalities.length === 0) {
      const industryDefaults = {
        restaurant: ["casual"], bar: ["energetic"], hotel: ["luxury"], cafe: ["intimate"],
        brewery: ["rustic"], casino: ["energetic"], catering: ["editorial"], retail: ["modern"],
      };
      result.personalities = industryDefaults[result.industry] || ["casual"];
    }
    if (result.audiences.length === 0) result.audiences = ["millennial"];
    if (result.platforms.length === 0) result.platforms = ["instagram", "website"];

    // ══════════════════════════════════════════════
    // ── DEEP EXTRACTION: Menu, Services, Spaces ──
    // ══════════════════════════════════════════════

    // ── Menu items / dishes / drinks
    const menuItems = [];
    // Common dish patterns
    const dishPatterns = [
      // Proteins & mains
      /\b((?:grilled|roasted|pan-seared|braised|fried|blackened|smoked|wood-fired|chargrilled)\s+(?:chicken|salmon|steak|pork|lamb|duck|shrimp|lobster|trout|halibut|tuna|cod|scallops|ribs|brisket|burger)(?:\s+[\w]+){0,3})/gi,
      /\b((?:filet mignon|ribeye|new york strip|prime rib|t-bone|porterhouse|wagyu|tomahawk|beef wellington|rack of lamb|lamb chops|duck breast|pork belly|short ribs)(?:\s+[\w]+){0,2})/gi,
      // Pasta & italian
      /\b((?:spaghetti|fettuccine|linguine|penne|rigatoni|gnocchi|ravioli|tortellini|lasagna|risotto|carbonara|bolognese|alfredo|puttanesca|arrabbiata|cacio e pepe|aglio e olio)(?:\s+[\w]+){0,3})/gi,
      // Sushi & japanese
      /\b((?:sashimi|nigiri|maki|tempura|ramen|udon|soba|gyoza|edamame|teriyaki|katsu|yakitori|tataki|omakase)(?:\s+[\w]+){0,2})/gi,
      // Mexican & latin
      /\b((?:taco|burrito|enchilada|quesadilla|fajita|tamale|ceviche|carnitas|barbacoa|mole|chilaquiles|elote|churro|guacamole|pico de gallo)(?:s)?(?:\s+[\w]+){0,2})/gi,
      // Asian
      /\b((?:pad thai|fried rice|kung pao|general tso|sweet and sour|lo mein|chow mein|dim sum|pho|banh mi|satay|curry|tikka masala|vindaloo|biryani|naan|samosa)(?:\s+[\w]+){0,2})/gi,
      // Appetizers & shared
      /\b((?:bruschetta|charcuterie|crudité|calamari|wings|sliders|nachos|hummus|mezze|antipasto|spring roll|crab cake|oysters|clams|mussels)(?:\s+[\w]+){0,2})/gi,
      // Salads & soups
      /\b((?:caesar|cobb|wedge|caprese|niçoise|greek|arugula|kale|beet)\s+salad)/gi,
      /\b((?:french onion|tomato bisque|clam chowder|lobster bisque|minestrone|gazpacho|ramen|pho)\s*(?:soup)?)/gi,
      // Sandwiches & burgers
      /\b((?:club|blt|reuben|cuban|po'?\s*boy|philly cheesesteak|muffuletta|grilled cheese|turkey club|pulled pork)\s*(?:sandwich)?)/gi,
      /\b((?:classic|smash|wagyu|truffle|mushroom swiss|bacon|bbq|impossible|beyond)\s+burger)/gi,
      // Pizza
      /\b((?:margherita|pepperoni|hawaiian|meat lovers|supreme|four cheese|white|buffalo chicken|fig and prosciutto|truffle)\s+pizza)/gi,
      // Desserts
      /\b((?:crème brûlée|tiramisu|cheesecake|chocolate cake|key lime pie|panna cotta|bread pudding|gelato|sorbet|affogato|bananas foster|molten lava cake|carrot cake|cannoli|profiterole|tart tatin|soufflé|crêpe|churros|beignets))/gi,
      // Breakfast & brunch
      /\b((?:eggs benedict|french toast|pancakes|waffles|omelette|frittata|avocado toast|shakshuka|breakfast burrito|huevos rancheros|açaí bowl|granola|quiche))/gi,
      // Seafood specific
      /\b((?:lobster roll|fish and chips|fish tacos|poke bowl|seafood tower|oyster platter|shrimp cocktail|crab legs|clambake|bouillabaisse))/gi,
    ];
    // Drink patterns
    const drinkPatterns = [
      // Cocktails
      /\b((?:old fashioned|manhattan|martini|margarita|mojito|daiquiri|negroni|cosmopolitan|mai tai|paloma|spritz|aperol spritz|espresso martini|moscow mule|whiskey sour|gimlet|sidecar|sazerac|mint julep|tom collins|french 75|pisco sour|dark and stormy|long island|bloody mary|bellini|mimosa|singapore sling|aviation|last word|paper plane|penicillin|boulevardier))/gi,
      // Beer
      /\b((?:ipa|pale ale|stout|porter|lager|pilsner|wheat beer|saison|sour beer|amber ale|brown ale|hefeweizen|kolsch|bock|dunkel|tripel|dubbel|witbier|gose|berliner weisse|cream ale|irish red|scotch ale|barleywine|imperial stout))/gi,
      // Wine
      /\b((?:cabernet|merlot|pinot noir|chardonnay|sauvignon blanc|riesling|pinot grigio|malbec|syrah|shiraz|zinfandel|tempranillo|sangiovese|nebbiolo|grenache|viognier|gewürztraminer|prosecco|champagne|cava|rosé|moscato|port|sherry|vermouth))/gi,
      // Spirits
      /\b((?:bourbon|scotch|rye whiskey|single malt|blended whiskey|tequila|mezcal|vodka|gin|rum|brandy|cognac|armagnac|grappa|absinthe|sake|soju|baijiu|pisco|cachaça))/gi,
      // Non-alcoholic
      /\b((?:espresso|cappuccino|latte|americano|cold brew|matcha|chai|kombucha|fresh juice|smoothie|mocktail|virgin|non-alcoholic|zero-proof|craft soda|arnold palmer|shrub|tonic))/gi,
    ];

    const seenItems = new Set();
    for (const pat of dishPatterns) {
      let m;
      while ((m = pat.exec(text)) !== null) {
        const item = m[1].trim().replace(/\s+/g, " ");
        const key = item.toLowerCase();
        if (item.length > 3 && item.length < 80 && !seenItems.has(key)) {
          seenItems.add(key);
          menuItems.push({ name: item, category: "food" });
        }
      }
    }
    for (const pat of drinkPatterns) {
      let m;
      while ((m = pat.exec(text)) !== null) {
        const item = m[1].trim().replace(/\s+/g, " ");
        const key = item.toLowerCase();
        if (item.length > 2 && item.length < 60 && !seenItems.has(key)) {
          seenItems.add(key);
          menuItems.push({ name: item, category: "drink" });
        }
      }
    }
    // Also catch price-tagged items: "$14 Truffle Fries"
    const priceItemPat = /\$\d+(?:\.\d{2})?\s+([A-Z][\w\s&'-]{2,40})/g;
    let pm;
    while ((pm = priceItemPat.exec(text)) !== null) {
      const item = pm[1].trim();
      const key = item.toLowerCase();
      if (!seenItems.has(key) && item.length > 3) {
        seenItems.add(key);
        const isDrink = /cocktail|beer|wine|spirit|martini|margarita|sour|mule|spritz|ale|lager|ipa|stout|bourbon|scotch|vodka|gin|rum|tequila|juice|coffee|latte|tea/i.test(item);
        menuItems.push({ name: item, category: isDrink ? "drink" : "food" });
      }
    }
    result.menuItems = menuItems.slice(0, 100); // Cap at 100

    // ── Service types
    const serviceDetect = {
      "Dine-in": /dine-in|dine in|sit-down|table service|full service|seated/i,
      "Takeout": /takeout|take-out|take out|to-go|to go|carry-out|carryout/i,
      "Delivery": /deliver|uber eats|doordash|grubhub|postmates|delivery/i,
      "Catering": /cater|off-site|off site|banquet|corporate.*event|wedding.*reception/i,
      "Private Events": /private.*event|private.*dining|private.*room|buyout|event.*space|event.*booking/i,
      "Bar Service": /full bar|craft cocktail|bar program|mixolog|beverage program|drink menu|wine list|beer list/i,
      "Brunch Service": /brunch|sunday.*brunch|weekend.*brunch|bottomless/i,
      "Happy Hour": /happy hour|drink.*special|half.*off|discounted.*drink/i,
      "Counter Service": /counter.*service|quick.*service|fast.*casual|order.*counter|self.*serve/i,
      "Room Service": /room.*service|in-room.*dining|hotel.*dining/i,
      "Curbside": /curbside|drive-up|drive.*thru|drive.*through/i,
      "Ghost Kitchen": /ghost.*kitchen|virtual.*kitchen|cloud.*kitchen|delivery.*only/i,
      "Food Truck": /food.*truck|mobile.*kitchen|pop-up/i,
      "Tasting Menu": /tasting.*menu|prix.*fixe|omakase|degustation|multi-course/i,
      "Wine Program": /wine.*program|wine.*list|sommelier|wine.*cellar|wine.*pairing|wine.*dinner/i,
      "Live Entertainment": /live.*music|live.*band|entertainment|dj|karaoke|trivia|open.*mic/i,
    };
    result.serviceTypes = Object.entries(serviceDetect)
      .filter(([, pat]) => pat.test(t))
      .map(([name]) => name);

    // ── Physical spaces
    const spaceDetect = {
      "Main Dining Room": /main.*dining|dining.*room|dining.*area|dining.*hall/i,
      "Bar": /\bbar\b|bar area|bar seating|bar.*counter/i,
      "Lounge": /lounge|cocktail.*lounge|wine.*lounge/i,
      "Patio": /patio|outdoor.*seat|outdoor.*dining|al fresco|sidewalk.*seat/i,
      "Rooftop": /rooftop|roof.*deck|rooftop.*bar|sky.*lounge|terrace/i,
      "Private Dining Room": /private.*room|private.*dining|vip.*room|boardroom/i,
      "Wine Cellar": /wine.*cellar|cellar.*room|cellar.*dining/i,
      "Chef's Table": /chef'?s.*table|kitchen.*table|tasting.*room/i,
      "Banquet Hall": /banquet|ballroom|event.*hall|reception.*hall|conference/i,
      "Open Kitchen": /open.*kitchen|exhibition.*kitchen|show.*kitchen|kitchen.*theater/i,
      "Garden": /garden|courtyard|green.*space|herb.*garden|kitchen.*garden/i,
      "Pool Area": /pool|poolside|cabana|swim-up/i,
      "Spa": /spa|wellness|treatment.*room|sauna|steam.*room/i,
      "Lobby": /lobby|reception|foyer|entrance.*hall/i,
      "Gaming Floor": /gaming.*floor|casino.*floor|slot|poker.*room|table.*games/i,
      "Event Lawn": /event.*lawn|lawn|outdoor.*event|tent.*space/i,
      "Raw Bar": /raw.*bar|oyster.*bar|shellfish.*bar|seafood.*bar/i,
      "Sushi Bar": /sushi.*bar|sushi.*counter|omakase.*counter/i,
      "Bakery Counter": /bakery|pastry.*case|display.*case|counter/i,
      "Drive-Through": /drive.*thru|drive.*through|pickup.*window/i,
    };
    result.spaces = Object.entries(spaceDetect)
      .filter(([, pat]) => pat.test(t))
      .map(([name]) => name);

    // ── Cuisine types
    const cuisineDetect = {
      "American": /american|burger|bbq|comfort food|diner|steakhouse|southern|cajun|creole|tex-mex/i,
      "Italian": /italian|pasta|pizza|trattoria|ristorante|osteria|enoteca|focaccia|risotto|gelato/i,
      "Japanese": /japanese|sushi|ramen|izakaya|tempura|yakitori|omakase|teppanyaki|robata/i,
      "Mexican": /mexican|taco|burrito|enchilada|cantina|taqueria|mezcal|mole|elote/i,
      "Chinese": /chinese|dim sum|szechuan|cantonese|wok|dumpling|peking|mapo|kung pao/i,
      "French": /french|bistro|brasserie|patisserie|croissant|escargot|confit|bouillabaisse/i,
      "Thai": /thai|pad thai|green curry|tom yum|satay|larb|som tum|basil chicken/i,
      "Indian": /indian|curry|tikka|naan|tandoor|biryani|masala|vindaloo|samosa|chutney/i,
      "Mediterranean": /mediterranean|hummus|falafel|mezze|kebab|pita|shawarma|tahini|za'atar/i,
      "Korean": /korean|bibimbap|bulgogi|kimchi|korean bbq|banchan|japchae|tteok/i,
      "Vietnamese": /vietnamese|pho|banh mi|spring roll|bun|vermicelli|lemongrass/i,
      "Seafood": /seafood|fish|oyster|shellfish|lobster|crab|shrimp|raw bar|catch of the day/i,
      "Steakhouse": /steakhouse|prime|usda|dry-aged|wet-aged|wagyu|angus|bone-in|porterhouse/i,
      "Farm-to-Table": /farm.to.table|locally.*sourced|seasonal.*menu|organic|sustainable|foraged/i,
      "Fusion": /fusion|cross-cultural|blend|eclectic.*menu|global.*flavors|world.*cuisine/i,
      "BBQ / Smokehouse": /bbq|barbecue|smokehouse|smoked|pit|low and slow|brisket|pulled pork/i,
      "Bakery & Pastry": /bakery|pastry|bread|sourdough|patisserie|confection|cake|croissant/i,
      "Vegan / Plant-Based": /vegan|plant.based|vegetarian|meatless|plant.forward|dairy.free/i,
      "Tapas / Small Plates": /tapas|small plate|shared plate|mezze|pintxos|cicchetti|izakaya/i,
      "Brunch": /brunch.*menu|brunch.*spot|bottomless.*brunch|weekend.*brunch|eggs.*benedict/i,
    };
    result.cuisineTypes = Object.entries(cuisineDetect)
      .filter(([, pat]) => pat.test(t))
      .map(([name]) => name);

    // ── Price tier
    const prices = text.match(/\$(\d+(?:\.\d{2})?)/g) || [];
    const priceVals = prices.map(p => parseFloat(p.replace("$", ""))).filter(v => v > 0 && v < 1000);
    if (priceVals.length > 0) {
      const avg = priceVals.reduce((s, v) => s + v, 0) / priceVals.length;
      if (avg > 50) result.priceTier = "fine";
      else if (avg > 25) result.priceTier = "premium";
      else if (avg > 12) result.priceTier = "mid";
      else result.priceTier = "budget";
    }
    // Also detect from language
    if (!result.priceTier) {
      if (/fine dining|luxury|prix fixe|tasting menu|michelin|white tablecloth|sommelier/i.test(t)) result.priceTier = "fine";
      else if (/upscale|premium|craft|artisan|curated|elevated/i.test(t)) result.priceTier = "premium";
      else if (/casual|neighborhood|family|comfort|affordable/i.test(t)) result.priceTier = "mid";
      else if (/budget|cheap|value|deal|dollar|fast/i.test(t)) result.priceTier = "budget";
    }

    // ── Dayparts
    const daypartDetect = {
      "breakfast": /breakfast|morning|early.*bird|a\.m\./i,
      "brunch": /brunch|sunday.*morning|weekend.*morning|bottomless|mimosa.*special/i,
      "lunch": /lunch|midday|noon|lunch.*special|business.*lunch/i,
      "dinner": /dinner|evening|supper|pm.*service|dinner.*service/i,
      "late-night": /late.*night|after.*hours|midnight|night.*owl|bar.*bites|late.*menu/i,
      "happy-hour": /happy.*hour|after.*work|drink.*special.*(?:3|4|5)|half.*off/i,
      "all-day": /all.*day|open.*(?:to|through)|continuous|no.*break/i,
    };
    result.dayparts = Object.entries(daypartDetect)
      .filter(([, pat]) => pat.test(t))
      .map(([name]) => name);

    // ── Signature items / specialties
    const sigPatterns = [
      /(?:signature|famous|renowned|award-winning|best-selling|house|specialty|our|the)\s+(?:dish|item|cocktail|drink|plate|)?\s*(?:is|are|:)?\s*(?:the\s+)?([A-Z][\w\s&'-]{3,50})/gi,
      /(?:known for|famous for|celebrated for|must-try|don't miss|crowd favorite|fan favorite|best seller|house special)\s*(?::)?\s*(?:the\s+|our\s+)?([A-Z][\w\s&'-]{3,50})/gi,
    ];
    const sigSet = new Set();
    for (const pat of sigPatterns) {
      let m;
      while ((m = pat.exec(text)) !== null) {
        const item = m[1].trim().replace(/[.,;:!?]+$/, "");
        if (item.length > 3 && item.length < 50 && !sigSet.has(item.toLowerCase())) {
          sigSet.add(item.toLowerCase());
          result.signatures.push(item);
        }
      }
    }
    result.signatures = result.signatures.slice(0, 15);

    return result;
  }, []);

  const analyzeBrand = useCallback(async (file) => {
    setUploading(true);
    setUploadError("");
    setUploadStatus("Reading file...");

    try {
      const isImage = file.type.startsWith("image/");
      const isPDF = file.type === "application/pdf";

      let extractedText = "";
      let extractedColors = null;

      if (isImage) {
        // Extract colors from image
        setUploadStatus("Extracting brand colors...");
        const dataUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
        extractedColors = await extractColorsFromImage(dataUrl);
        // Images don't have text to extract
        extractedText = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
      } else if (isPDF) {
        setUploadStatus("Parsing PDF...");
        const arrayBuffer = await file.arrayBuffer();
        extractedText = await extractPDFText(arrayBuffer);
        if (!extractedText || extractedText.trim().length < 20) {
          throw new Error("Could not extract text from PDF. Try a text-based PDF or upload a different format.");
        }
      } else {
        // Text / markdown / other
        setUploadStatus("Reading document...");
        extractedText = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsText(file);
        });
      }

      setUploadStatus("Analyzing brand identity...");
      await new Promise(r => setTimeout(r, 400)); // Brief visual pause

      const result = analyzeText(extractedText);

      // Apply image colors if extracted
      if (extractedColors) {
        result.colorPrimary = extractedColors[0];
        result.colorSecondary = extractedColors[1];
        result.colorAccent = extractedColors[2];
      }

      // If no name found, use filename
      if (!result.businessName) {
        result.businessName = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      }

      setUploadStatus("Building profile...");
      await new Promise(r => setTimeout(r, 300));

      setProfile(result);
      setUploadStatus("Profile built! Review and adjust →");

      setTimeout(() => {
        setUploading(false);
        setUploadStatus("");
        setScreen("wizard");
        setWizStep(0);
      }, 1200);

    } catch (err) {
      console.error("Brand analysis error:", err);
      setUploading(false);
      setUploadError(err.message || "Analysis failed. Try a different file or build your profile manually.");
      setUploadStatus("");
    }
  }, [analyzeText, extractColorsFromImage, extractPDFText]);

  const handleFileDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer?.files?.[0] || e.target?.files?.[0];
    if (file) analyzeBrand(file);
  }, [analyzeBrand]);

  const handleFileSelect = useCallback((e) => {
    const file = e.target?.files?.[0];
    if (file) analyzeBrand(file);
  }, [analyzeBrand]);

  const chip = (active) => ({
    display: "inline-flex", alignItems: "center", gap: "0.5rem",
    padding: "0.7rem 1.15rem", borderRadius: "2rem",
    border: active ? `2px solid ${ac}` : "1px solid #333",
    background: active ? `${ac}18` : "rgba(255,255,255,0.03)",
    color: active ? ac : "#aaa", cursor: "pointer", transition: "all 0.2s",
    fontSize: "0.88rem", fontFamily: "'Georgia', serif",
  });
  const inp = {
    width: "100%", padding: "0.85rem 1rem", background: "rgba(255,255,255,0.05)",
    border: "1px solid #333", borderRadius: "0.5rem", color: "#e0e0e0",
    fontSize: "0.95rem", fontFamily: "'Georgia', serif", outline: "none", boxSizing: "border-box",
  };

  // ─── LANDING ───
  if (screen === "landing") return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 40%, #16213e 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Georgia', serif", color: "#e0e0e0", padding: "2rem" }}>
      <div style={{ textAlign: "center", maxWidth: 640 }}>
        <div style={{ fontSize: "3.5rem", fontWeight: 300, letterSpacing: "0.15em", color: "#fff" }}>SHOT LIST</div>
        <div style={{ fontSize: "1rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#888", marginBottom: "2.5rem" }}>Generator</div>
        <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, transparent, #e94560, transparent)", margin: "0 auto 2.5rem" }} />
        <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#aaa", marginBottom: "3rem", fontStyle: "italic" }}>
          Input your brand. Get a visual language tailored to your identity.<br/>
          1,200 cinematic styles across 25 categories — filtered through who you are.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setScreen("upload")} style={{ background: "#e94560", border: "1px solid #e94560", color: "#fff", padding: "1rem 2.5rem", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit", borderRadius: "0.25rem", transition: "all 0.3s" }}
            onMouseEnter={e => { e.target.style.background = "#d63850"; }}
            onMouseLeave={e => { e.target.style.background = "#e94560"; }}>
            📄 Upload Brand Guide
          </button>
          <button onClick={() => setScreen("wizard")} style={{ background: "transparent", border: "1px solid #e94560", color: "#e94560", padding: "1rem 2.5rem", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit", borderRadius: "0.25rem", transition: "all 0.3s" }}
            onMouseEnter={e => { e.target.style.background = "#e94560"; e.target.style.color = "#fff"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#e94560"; }}>
            Build Manually →
          </button>
        </div>
        <p style={{ fontSize: "0.8rem", color: "#555", marginTop: "1.5rem" }}>
          Upload a brand guide, one-pager, PDF, or logo — your profile is built instantly, 100% in-browser.
        </p>
      </div>
      <div style={{ position: "absolute", bottom: "2rem", fontSize: "0.7rem", color: "#444", letterSpacing: "0.2em" }}>POWERED BY JSDETAIL LLC</div>
    </div>
  );

  // ─── UPLOAD SCREEN ───
  if (screen === "upload") return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 40%, #16213e 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Georgia', serif", color: "#e0e0e0", padding: "2rem" }}>
      <div style={{ textAlign: "center", maxWidth: 600, width: "100%" }}>
        <div style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: "#666", textTransform: "uppercase", marginBottom: "0.5rem" }}>BRAND INTELLIGENCE</div>
        <h2 style={{ fontSize: "2rem", fontWeight: 300, marginBottom: "0.5rem", color: "#fff" }}>Upload Your Brand</h2>
        <p style={{ color: "#888", marginBottom: "2.5rem", fontStyle: "italic" }}>
          Drop a brand guide, one-pager, menu, or logo — the engine reads it locally and builds your profile. No data leaves your browser.
        </p>

        {!uploading ? (
          <div>
            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleFileDrop}
              onClick={() => document.getElementById("brandFileInput")?.click()}
              style={{
                border: dragOver ? "2px solid #e94560" : "2px dashed #333",
                borderRadius: "1rem",
                padding: "3.5rem 2rem",
                cursor: "pointer",
                transition: "all 0.3s",
                background: dragOver ? "rgba(233,69,96,0.08)" : "rgba(255,255,255,0.02)",
                marginBottom: "1.5rem",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📄</div>
              <div style={{ fontSize: "1rem", color: dragOver ? "#e94560" : "#aaa", marginBottom: "0.5rem" }}>
                {dragOver ? "Drop it here" : "Drag & drop a file here"}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#555" }}>
                or click to browse — PDF, DOCX, TXT, PNG, JPG
              </div>
              <input
                id="brandFileInput"
                type="file"
                accept=".pdf,.doc,.docx,.txt,.md,.png,.jpg,.jpeg,.webp"
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />
            </div>

            {/* Supported formats */}
            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
              {["Brand Guide", "One-Pager", "Menu PDF", "Logo Image", "Pitch Deck", "Website Screenshot"].map(f => (
                <span key={f} style={{ padding: "0.35rem 0.75rem", background: "rgba(255,255,255,0.03)", border: "1px solid #222", borderRadius: "1rem", fontSize: "0.75rem", color: "#666" }}>{f}</span>
              ))}
            </div>

            {/* What it extracts */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid #1a1a1a", borderRadius: "0.5rem", padding: "1.25rem", textAlign: "left", marginBottom: "2rem" }}>
              <div style={{ fontSize: "0.7rem", color: "#555", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>WHAT IT EXTRACTS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                {["Business name & industry", "Brand personality & tone", "Target audience", "Brand colors from visuals", "Platforms & channels", "Venue / location info", "Music & vibe keywords", "Brand description"].map(item => (
                  <div key={item} style={{ fontSize: "0.82rem", color: "#888", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ color: "#e94560", fontSize: "0.7rem" }}>✓</span> {item}
                  </div>
                ))}
              </div>
            </div>

            {uploadError && (
              <div style={{ padding: "1rem", background: "rgba(233,69,96,0.1)", border: "1px solid rgba(233,69,96,0.3)", borderRadius: "0.5rem", color: "#e94560", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                {uploadError}
              </div>
            )}

            <button onClick={() => { setScreen("landing"); setUploadError(""); }} style={{ background: "transparent", border: "1px solid #333", color: "#888", padding: "0.75rem 2rem", cursor: "pointer", fontFamily: "inherit", borderRadius: "0.25rem", fontSize: "0.85rem" }}>
              ← Back
            </button>
          </div>
        ) : (
          /* Analyzing state */
          <div style={{ padding: "3rem 2rem" }}>
            <div style={{ marginBottom: "2rem" }}>
              <div style={{
                width: 60, height: 60, borderRadius: "50%", border: "3px solid #222",
                borderTopColor: "#e94560", margin: "0 auto 1.5rem",
                animation: "spin 1s linear infinite",
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
            <div style={{ fontSize: "1.1rem", color: "#fff", marginBottom: "0.5rem" }}>{uploadStatus}</div>
            <p style={{ fontSize: "0.85rem", color: "#666", fontStyle: "italic" }}>
              Reading your document, identifying brand attributes, matching visual styles — all locally in your browser.
            </p>
            {/* Progress stages */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "2rem", textAlign: "left", maxWidth: 300, margin: "2rem auto 0" }}>
              {["Reading file...", "Analyzing brand identity...", "Building profile..."].map((stage, i) => {
                const active = uploadStatus === stage;
                const done = ["Reading file...", "Analyzing brand identity...", "Building profile...", "Profile built! Review and adjust →"].indexOf(uploadStatus) > i;
                return (
                  <div key={stage} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.82rem" }}>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem",
                      background: done ? "rgba(233,69,96,0.2)" : active ? "rgba(233,69,96,0.1)" : "rgba(255,255,255,0.03)",
                      border: done ? "1px solid #e94560" : active ? "1px solid #e9456066" : "1px solid #333",
                      color: done ? "#e94560" : "#555",
                    }}>{done ? "✓" : active ? "●" : ""}</span>
                    <span style={{ color: done ? "#e94560" : active ? "#fff" : "#555" }}>{stage}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ─── WIZARD ───
  if (screen === "wizard") {
    const steps = [
      { title: "Identity", sub: "Who are you?" },
      { title: "Personality", sub: "What's your vibe?" },
      { title: "Audience", sub: "Who are you reaching?" },
      { title: "Aesthetics", sub: "Colors & platforms" },
      { title: "Venues", sub: "Your spaces" },
    ];
    const ok = () => {
      if (wizStep === 0) return profile.businessName && profile.industry;
      if (wizStep === 1) return profile.personalities.length > 0;
      if (wizStep === 2) return profile.audiences.length > 0;
      if (wizStep === 3) return profile.platforms.length > 0;
      return true;
    };
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 40%, #16213e 100%)", fontFamily: "'Georgia', serif", color: "#e0e0e0", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: "0.25rem", padding: "1.5rem 2rem 0" }}>
          {steps.map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= wizStep ? "#e94560" : "#222" }} />)}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", maxWidth: 640, margin: "0 auto", width: "100%" }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: "#666", textTransform: "uppercase", marginBottom: "0.5rem" }}>Step {wizStep+1} of {steps.length}</div>
          <h2 style={{ fontSize: "2rem", fontWeight: 300, marginBottom: "0.25rem", color: "#fff" }}>{steps[wizStep].title}</h2>
          <p style={{ color: "#888", marginBottom: "2.5rem", fontStyle: "italic" }}>{steps[wizStep].sub}</p>

          {wizStep === 0 && <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Quick upload option */}
            <div onClick={() => setScreen("upload")} style={{ padding: "0.85rem 1rem", background: "rgba(233,69,96,0.06)", border: "1px dashed rgba(233,69,96,0.3)", borderRadius: "0.5rem", cursor: "pointer", textAlign: "center", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#e94560"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(233,69,96,0.3)"}>
              <span style={{ fontSize: "0.85rem", color: "#e94560" }}>📄 Have a brand guide? Upload it instead</span>
              <span style={{ fontSize: "0.75rem", color: "#666", display: "block", marginTop: "0.2rem" }}>Extracts your profile from the document — no API, runs locally</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ flex: 1, height: 1, background: "#222" }} />
              <span style={{ fontSize: "0.7rem", color: "#555", letterSpacing: "0.1em" }}>OR FILL MANUALLY</span>
              <div style={{ flex: 1, height: 1, background: "#222" }} />
            </div>
            <div><label style={{ fontSize: "0.8rem", color: "#888", letterSpacing: "0.1em", display: "block", marginBottom: "0.5rem" }}>BUSINESS NAME</label>
            <input style={inp} placeholder="e.g. The Copper Vine" value={profile.businessName} onChange={e => up("businessName", e.target.value)} /></div>
            <div><label style={{ fontSize: "0.8rem", color: "#888", letterSpacing: "0.1em", display: "block", marginBottom: "0.5rem" }}>INDUSTRY</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {INDUSTRIES.map(i => <div key={i.id} onClick={() => up("industry", i.id)} style={chip(profile.industry === i.id)}><span>{i.icon}</span> {i.name}</div>)}
            </div></div>
            <div><label style={{ fontSize: "0.8rem", color: "#888", letterSpacing: "0.1em", display: "block", marginBottom: "0.5rem" }}>DESCRIPTION (optional)</label>
            <textarea style={{ ...inp, minHeight: 80, resize: "vertical" }} placeholder="Anything about your brand..." value={profile.description} onChange={e => up("description", e.target.value)} /></div>
          </div>}

          {wizStep === 1 && <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <label style={{ fontSize: "0.8rem", color: "#888", letterSpacing: "0.1em" }}>SELECT ALL THAT FIT (1-3)</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {PERSONALITIES.map(p => <div key={p.id} onClick={() => tog("personalities", p.id)} style={chip(profile.personalities.includes(p.id))}>{p.name}</div>)}
            </div>
            <div><label style={{ fontSize: "0.8rem", color: "#888", letterSpacing: "0.1em", display: "block", marginBottom: "0.5rem" }}>MUSIC / VIBE KEYWORDS (optional)</label>
            <input style={inp} placeholder="jazz, lo-fi, rock, acoustic..." value={profile.musicGenres} onChange={e => up("musicGenres", e.target.value)} /></div>
          </div>}

          {wizStep === 2 && <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <label style={{ fontSize: "0.8rem", color: "#888", letterSpacing: "0.1em" }}>WHO ARE YOU TRYING TO REACH?</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {AUDIENCES.map(a => <div key={a.id} onClick={() => tog("audiences", a.id)} style={chip(profile.audiences.includes(a.id))}>{a.name}</div>)}
            </div>
          </div>}

          {wizStep === 3 && <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div><label style={{ fontSize: "0.8rem", color: "#888", letterSpacing: "0.1em", display: "block", marginBottom: "0.5rem" }}>BRAND COLORS</label>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              {[["colorPrimary","Primary"],["colorSecondary","Secondary"],["colorAccent","Accent"]].map(([k,l]) =>
                <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                  <input type="color" value={profile[k]} onChange={e => up(k, e.target.value)} style={{ width: 48, height: 48, border: "1px solid #333", borderRadius: "0.5rem", cursor: "pointer", background: "transparent" }} />
                  <span style={{ fontSize: "0.7rem", color: "#666" }}>{l}</span>
                </div>
              )}
              <div style={{ flex: 1, height: 48, borderRadius: "0.5rem", border: "1px solid #333", background: `linear-gradient(135deg, ${profile.colorPrimary}, ${profile.colorSecondary}, ${profile.colorAccent})` }} />
            </div></div>
            <div><label style={{ fontSize: "0.8rem", color: "#888", letterSpacing: "0.1em", display: "block", marginBottom: "0.5rem" }}>PLATFORMS</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {PLATFORMS.map(p => <div key={p.id} onClick={() => tog("platforms", p.id)} style={chip(profile.platforms.includes(p.id))}><span>{p.icon}</span> {p.name}</div>)}
            </div></div>
          </div>}

          {wizStep === 4 && <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <label style={{ fontSize: "0.8rem", color: "#888", letterSpacing: "0.1em" }}>YOUR OUTLETS / VENUES</label>
            {profile.venues.map((v, i) => <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <input style={{ ...inp, flex: 2 }} placeholder="Venue name" value={v.name} onChange={e => upVenue(i, "name", e.target.value)} />
              <input style={{ ...inp, flex: 1 }} placeholder="Type" value={v.type} onChange={e => upVenue(i, "type", e.target.value)} />
              {profile.venues.length > 1 && <button onClick={() => rmVenue(i)} style={{ background: "none", border: "1px solid #444", color: "#666", width: 36, height: 36, borderRadius: "50%", cursor: "pointer" }}>×</button>}
            </div>)}
            <button onClick={addVenue} style={{ background: "none", border: "1px dashed #444", color: "#888", padding: "0.75rem", borderRadius: "0.5rem", cursor: "pointer", fontFamily: "inherit" }}>+ Add Venue</button>
          </div>}

          <div style={{ display: "flex", gap: "1rem", marginTop: "3rem", width: "100%" }}>
            {wizStep > 0 && <button onClick={() => setWizStep(s => s-1)} style={{ flex: 1, padding: "1rem", background: "transparent", border: "1px solid #333", color: "#888", cursor: "pointer", fontFamily: "inherit", borderRadius: "0.25rem" }}>← Back</button>}
            <button onClick={() => { if (wizStep < 4) setWizStep(s => s+1); else { setScreen("dashboard"); setDashMode("browse"); } }}
              disabled={!ok()} style={{ flex: 2, padding: "1rem", background: ok() ? "#e94560" : "#333", border: "none", color: ok() ? "#fff" : "#666", cursor: ok() ? "pointer" : "default", fontFamily: "inherit", letterSpacing: "0.2em", textTransform: "uppercase", borderRadius: "0.25rem" }}>
              {wizStep < 4 ? "Continue →" : "Launch Dashboard →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── DASHBOARD ───
  const nav = [{ id: "browse", n: "Browse", i: "🔍" },{ id: "storyboard", n: "Storyboard", i: "🎬" },{ id: "shotlist", n: `Shot List (${shotList.length})`, i: "📋" },{ id: "profile", n: "Profile", i: "⚙️" }];
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${profile.colorPrimary}ee 0%, #0a0a0f 40%, ${profile.colorSecondary}44 100%)`, fontFamily: "'Georgia', serif", color: "#e0e0e0" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", borderBottom: "1px solid #222", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(10px)" }}>
        <div>
          <span style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff" }}>{profile.businessName}</span>
          <span style={{ fontSize: "0.75rem", color: "#666", marginLeft: "0.75rem" }}>{INDUSTRIES.find(i => i.id === profile.industry)?.icon} {INDUSTRIES.find(i => i.id === profile.industry)?.name}</span>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: ac, border: "2px solid rgba(255,255,255,0.2)" }} />
          <span style={{ fontSize: "0.8rem", color: "#888" }}>1,200 styles</span>
        </div>
      </div>
      {/* Nav */}
      <div style={{ display: "flex", borderBottom: "1px solid #222", background: "rgba(0,0,0,0.2)" }}>
        {nav.map(n => <button key={n.id} onClick={() => { setDashMode(n.id); if (n.id !== "storyboard") { setStoryboard(null); } }} style={{ flex: 1, padding: "0.85rem", background: dashMode === n.id ? "rgba(255,255,255,0.05)" : "transparent", border: "none", borderBottom: dashMode === n.id ? `2px solid ${ac}` : "2px solid transparent", color: dashMode === n.id ? "#fff" : "#666", cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit" }}>{n.i} {n.n}</button>)}
      </div>

      <div style={{ padding: "1.5rem", maxWidth: 900, margin: "0 auto" }}>
        {/* BROWSE */}
        {dashMode === "browse" && <div>
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            <input style={{ flex: 1, minWidth: 200, padding: "0.75rem 1rem", background: "rgba(255,255,255,0.05)", border: "1px solid #333", borderRadius: "0.5rem", color: "#e0e0e0", fontSize: "0.9rem", fontFamily: "inherit", outline: "none" }}
              placeholder="Search 1,200 styles..." value={search} onChange={e => { setSearch(e.target.value); setBrowseLimit(50); }} />
            <select value={catFilter || ""} onChange={e => { setCatFilter(e.target.value ? parseInt(e.target.value) : null); setBrowseLimit(50); }}
              style={{ padding: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid #333", borderRadius: "0.5rem", color: "#e0e0e0", fontFamily: "inherit" }}>
              <option value="">All Categories</option>
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
          </div>
          {/* Mood chips */}
          <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.75rem", color: "#666", alignSelf: "center", marginRight: "0.5rem" }}>MOOD:</span>
            <div onClick={() => setMood(null)} style={{ padding: "0.4rem 0.75rem", borderRadius: "1rem", fontSize: "0.8rem", cursor: "pointer", border: !mood ? `1px solid ${ac}` : "1px solid #333", color: !mood ? ac : "#888", background: !mood ? `${ac}22` : "transparent" }}>All</div>
            {MOODS.map(m => <div key={m.id} onClick={() => setMood(mood === m.id ? null : m.id)} style={{ padding: "0.4rem 0.75rem", borderRadius: "1rem", fontSize: "0.8rem", cursor: "pointer", border: mood === m.id ? `1px solid ${ac}` : "1px solid #333", color: mood === m.id ? ac : "#888", background: mood === m.id ? `${ac}22` : "transparent" }}>{m.icon} {m.name}</div>)}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#666", marginBottom: "0.75rem" }}>{filtered.length} styles matched — sorted by brand fit</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {filtered.slice(0, browseLimit).map(st => {
              const cat = CATEGORIES.find(c => c.id === st.catId);
              const fit = Math.min(99, Math.round((st.score / 4) * 100));
              return <div key={st.id} style={{ padding: "0.75rem 1rem", background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a1a", borderRadius: "0.4rem", display: "flex", alignItems: "center", gap: "0.75rem" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#333"} onMouseLeave={e => e.currentTarget.style.borderColor = "#1a1a1a"}>
                <span style={{ fontSize: "0.65rem", color: "#444", width: 28, textAlign: "right", flexShrink: 0 }}>#{st.id}</span>
                <span style={{ flex: 1, fontSize: "0.88rem", color: "#ddd" }}>{st.name}</span>
                <span style={{ fontSize: "0.7rem", color: "#555", whiteSpace: "nowrap" }}>{cat?.icon} {cat?.name}</span>
                <div style={{ display: "flex", gap: "0.2rem", flexShrink: 0 }}>
                  {st.tags.map((t,i) => <span key={i} style={{ padding: "0.1rem 0.35rem", background: "rgba(255,255,255,0.04)", borderRadius: "0.2rem", fontSize: "0.6rem", color: "#666" }}>{t}</span>)}
                </div>
                <div style={{ width: 45, height: 5, background: "#1a1a1a", borderRadius: 3, overflow: "hidden", flexShrink: 0 }}>
                  <div style={{ width: `${fit}%`, height: "100%", background: fit > 70 ? ac : fit > 40 ? "#f0a500" : "#555", borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: "0.65rem", color: fit > 70 ? ac : "#555", width: 30, flexShrink: 0 }}>{fit}%</span>
                <button onClick={() => addShot(st)} style={{ background: "none", border: `1px solid ${ac}33`, color: ac, padding: "0.25rem 0.5rem", borderRadius: "0.2rem", cursor: "pointer", fontSize: "0.7rem", fontFamily: "inherit", flexShrink: 0 }}>+</button>
              </div>;
            })}
          </div>
          {browseLimit < filtered.length && <button onClick={() => setBrowseLimit(l => l + 50)} style={{ width: "100%", marginTop: "1rem", padding: "0.75rem", background: "rgba(255,255,255,0.03)", border: "1px solid #222", borderRadius: "0.4rem", color: "#888", cursor: "pointer", fontFamily: "inherit" }}>Load more ({filtered.length - browseLimit} remaining)</button>}
        </div>}

        {/* STORYBOARD */}
        {dashMode === "storyboard" && <div>
          {!storyboard ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", paddingTop: "2rem" }}>
            <h3 style={{ fontWeight: 300, color: "#fff", fontSize: "1.5rem" }}>Generate a Storyboard</h3>
            <div style={{ width: "100%", maxWidth: 500 }}>
              <label style={{ fontSize: "0.8rem", color: "#888", letterSpacing: "0.1em", display: "block", marginBottom: "0.75rem" }}>MOOD</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                {MOODS.map(m => <div key={m.id} onClick={() => setMood(m.id)} style={{ padding: "1rem", borderRadius: "0.5rem", cursor: "pointer", border: mood === m.id ? `2px solid ${ac}` : "1px solid #333", background: mood === m.id ? `${ac}15` : "rgba(255,255,255,0.03)", textAlign: "center" }}>
                  <div style={{ fontSize: "1.5rem" }}>{m.icon}</div>
                  <div style={{ fontSize: "0.85rem", color: mood === m.id ? "#fff" : "#aaa", marginTop: "0.25rem" }}>{m.name}</div>
                </div>)}
              </div>
            </div>
            {mood && <div style={{ width: "100%", maxWidth: 500 }}>
              <label style={{ fontSize: "0.8rem", color: "#888", letterSpacing: "0.1em", display: "block", marginBottom: "0.75rem" }}>DURATION</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {DURATIONS.map(d => <div key={d.id} onClick={() => setDuration(d.id)} style={{ flex: 1, padding: "1rem", borderRadius: "0.5rem", cursor: "pointer", border: duration === d.id ? `2px solid ${ac}` : "1px solid #333", background: duration === d.id ? `${ac}15` : "rgba(255,255,255,0.03)", textAlign: "center" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: 600, color: duration === d.id ? "#fff" : "#aaa" }}>{d.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "#666" }}>{d.label} · {d.shots} shots</div>
                </div>)}
              </div>
            </div>}
            {mood && duration && <button onClick={doGen} style={{ padding: "1rem 3rem", background: ac, border: "none", color: "#fff", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.2em", textTransform: "uppercase", borderRadius: "0.25rem" }}>Generate</button>}
          </div> : <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <div>
                <h3 style={{ fontWeight: 300, color: "#fff", fontSize: "1.3rem", margin: 0 }}>{profile.businessName} — {MOODS.find(m => m.id === mood)?.icon} {MOODS.find(m => m.id === mood)?.name}</h3>
                <span style={{ fontSize: "0.8rem", color: "#666" }}>{DURATIONS.find(d => d.id === duration)?.name} · {storyboard.length} shots</span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={() => setStoryboard(null)} style={{ padding: "0.5rem 1rem", background: "transparent", border: "1px solid #333", color: "#888", cursor: "pointer", fontFamily: "inherit", borderRadius: "0.25rem" }}>← Back</button>
                <button onClick={doGen} style={{ padding: "0.5rem 1rem", background: "transparent", border: "1px solid #444", color: "#aaa", cursor: "pointer", fontFamily: "inherit", borderRadius: "0.25rem" }}>🎲 Reroll</button>
                <button onClick={() => storyboard.forEach(s => addShot(s, s.beatName))} style={{ padding: "0.5rem 1rem", background: ac, border: "none", color: "#fff", cursor: "pointer", fontFamily: "inherit", borderRadius: "0.25rem" }}>→ Add All</button>
              </div>
            </div>
            <div style={{ display: "flex", gap: "2px", marginBottom: "1.5rem", height: 4, borderRadius: 2, overflow: "hidden" }}>
              {storyboard.map((s, i) => <div key={i} style={{ flex: 1, background: `hsl(${(acH.h + i * 15) % 360}, ${acH.s}%, ${40 + (i%3)*10}%)` }} />)}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {storyboard.map((shot, i) => {
                const cat = CATEGORIES.find(c => c.id === shot.catId);
                return <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "0.85rem 1rem", background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a1a", borderRadius: "0.4rem" }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: `${ac}22`, border: `1px solid ${ac}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>{shot.beatIcon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.88rem", color: "#ddd" }}>{shot.name}</div>
                    <div style={{ fontSize: "0.7rem", color: "#555" }}>{shot.beatName} · {cat?.icon} {cat?.name}</div>
                  </div>
                  <div style={{ display: "flex", gap: "0.2rem", flexWrap: "wrap" }}>
                    {shot.tags.map((t,j) => <span key={j} style={{ padding: "0.1rem 0.35rem", background: "rgba(255,255,255,0.04)", borderRadius: "0.2rem", fontSize: "0.6rem", color: "#666" }}>{t}</span>)}
                  </div>
                  <button onClick={() => addShot(shot, shot.beatName)} style={{ background: "none", border: `1px solid ${ac}33`, color: ac, padding: "0.25rem 0.5rem", borderRadius: "0.2rem", cursor: "pointer", fontSize: "0.7rem", fontFamily: "inherit", flexShrink: 0 }}>+</button>
                </div>;
              })}
            </div>
          </div>}
        </div>}

        {/* SHOT LIST */}
        {dashMode === "shotlist" && <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h3 style={{ fontWeight: 300, color: "#fff", fontSize: "1.3rem", margin: 0 }}>Shot List <span style={{ color: "#666", fontSize: "0.9rem" }}>({shotList.length})</span></h3>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {shotList.length > 0 && <>
                <button onClick={() => {
                  const txt = `${profile.businessName} — Shot List\n${"=".repeat(40)}\n` + shotList.map((s,i) => `${i+1}. [${CATEGORIES.find(c => c.id === s.catId)?.name}] ${s.name}${s.note ? ` — ${s.note}` : ""}`).join("\n");
                  navigator.clipboard.writeText(txt);
                }} style={{ padding: "0.5rem 1rem", background: "transparent", border: "1px solid #444", color: "#aaa", cursor: "pointer", fontFamily: "inherit", borderRadius: "0.25rem" }}>📋 Copy</button>
                <button onClick={() => setShotList([])} style={{ padding: "0.5rem 1rem", background: "transparent", border: "1px solid #444", color: "#666", cursor: "pointer", fontFamily: "inherit", borderRadius: "0.25rem" }}>Clear</button>
              </>}
            </div>
          </div>
          {shotList.length === 0 ? <div style={{ textAlign: "center", padding: "4rem 2rem", color: "#555" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📋</div>
            <p style={{ fontStyle: "italic" }}>No shots yet. Browse or generate a storyboard to start building.</p>
          </div> : <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {shotList.map((shot, i) => {
              const cat = CATEGORIES.find(c => c.id === shot.catId);
              return <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "center", padding: "0.75rem 1rem", background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a1a", borderRadius: "0.4rem" }}>
                <span style={{ width: 26, height: 26, borderRadius: "50%", background: `${ac}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", color: ac, fontWeight: 600, flexShrink: 0 }}>{i+1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.88rem", color: "#ddd" }}>{shot.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "#555" }}>{cat?.icon} {cat?.name}{shot.note ? ` · ${shot.note}` : ""}</div>
                </div>
                <button onClick={() => rmShot(i)} style={{ background: "none", border: "1px solid #222", color: "#555", width: 26, height: 26, borderRadius: "50%", cursor: "pointer", fontSize: "0.75rem" }}>×</button>
              </div>;
            })}
          </div>}
        </div>}

        {/* PROFILE */}
        {dashMode === "profile" && <div>
          <h3 style={{ fontWeight: 300, color: "#fff", fontSize: "1.3rem", marginBottom: "1.5rem" }}>Brand Profile</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a1a", borderRadius: "0.5rem" }}>
              <div style={{ fontSize: "0.7rem", color: "#555", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>IDENTITY</div>
              <div style={{ fontSize: "1.1rem", color: "#fff", marginBottom: "0.4rem" }}>{profile.businessName}</div>
              <div style={{ fontSize: "0.85rem", color: "#aaa" }}>{INDUSTRIES.find(i => i.id === profile.industry)?.icon} {INDUSTRIES.find(i => i.id === profile.industry)?.name}</div>
              {profile.description && <div style={{ fontSize: "0.8rem", color: "#555", marginTop: "0.5rem", fontStyle: "italic" }}>{profile.description}</div>}
            </div>
            <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a1a", borderRadius: "0.5rem" }}>
              <div style={{ fontSize: "0.7rem", color: "#555", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>PERSONALITY</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {profile.personalities.map(p => <span key={p} style={{ padding: "0.3rem 0.7rem", background: `${ac}22`, border: `1px solid ${ac}44`, borderRadius: "1rem", fontSize: "0.8rem", color: ac }}>{PERSONALITIES.find(pp => pp.id === p)?.name}</span>)}
              </div>
              {profile.musicGenres && <div style={{ fontSize: "0.8rem", color: "#555", marginTop: "0.75rem" }}>🎵 {profile.musicGenres}</div>}
            </div>
            <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a1a", borderRadius: "0.5rem" }}>
              <div style={{ fontSize: "0.7rem", color: "#555", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>AUDIENCE</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {profile.audiences.map(a => <span key={a} style={{ padding: "0.3rem 0.7rem", background: "rgba(255,255,255,0.05)", border: "1px solid #333", borderRadius: "1rem", fontSize: "0.8rem", color: "#aaa" }}>{AUDIENCES.find(aa => aa.id === a)?.name}</span>)}
              </div>
            </div>
            <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a1a", borderRadius: "0.5rem" }}>
              <div style={{ fontSize: "0.7rem", color: "#555", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>AESTHETICS</div>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.75rem" }}>
                {[profile.colorPrimary, profile.colorSecondary, profile.colorAccent].map((c, i) => <div key={i} style={{ width: 22, height: 22, borderRadius: "50%", background: c, border: "1px solid #444" }} />)}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {profile.platforms.map(p => <span key={p} style={{ padding: "0.3rem 0.7rem", background: "rgba(255,255,255,0.05)", border: "1px solid #333", borderRadius: "1rem", fontSize: "0.8rem", color: "#aaa" }}>{PLATFORMS.find(pp => pp.id === p)?.icon} {PLATFORMS.find(pp => pp.id === p)?.name}</span>)}
              </div>
            </div>
            {/* Offerings extracted from uploads */}
            {((profile.menuItems || []).length > 0 || (profile.serviceTypes || []).length > 0 || (profile.spaces || []).length > 0) && <>

              {/* Cuisine & Price */}
              {((profile.cuisineTypes || []).length > 0 || profile.priceTier) && (
                <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a1a", borderRadius: "0.5rem" }}>
                  <div style={{ fontSize: "0.7rem", color: "#555", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>CUISINE & PRICE</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: profile.priceTier ? "0.75rem" : 0 }}>
                    {(profile.cuisineTypes || []).map(c => <span key={c} style={{ padding: "0.3rem 0.7rem", background: "rgba(255,255,255,0.05)", border: "1px solid #333", borderRadius: "1rem", fontSize: "0.8rem", color: "#aaa" }}>{c}</span>)}
                  </div>
                  {profile.priceTier && <div style={{ fontSize: "0.82rem", color: "#888" }}>
                    {"💰".repeat(profile.priceTier === "fine" ? 4 : profile.priceTier === "premium" ? 3 : profile.priceTier === "mid" ? 2 : 1)} {profile.priceTier.charAt(0).toUpperCase() + profile.priceTier.slice(1)} tier
                  </div>}
                </div>
              )}

              {/* Service Types & Dayparts */}
              {((profile.serviceTypes || []).length > 0 || (profile.dayparts || []).length > 0) && (
                <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a1a", borderRadius: "0.5rem" }}>
                  <div style={{ fontSize: "0.7rem", color: "#555", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>SERVICES & HOURS</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {(profile.serviceTypes || []).map(s => <span key={s} style={{ padding: "0.3rem 0.7rem", background: `${ac}15`, border: `1px solid ${ac}33`, borderRadius: "1rem", fontSize: "0.78rem", color: ac }}>{s}</span>)}
                  </div>
                  {(profile.dayparts || []).length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.75rem" }}>
                    {(profile.dayparts || []).map(d => <span key={d} style={{ padding: "0.3rem 0.7rem", background: "rgba(255,255,255,0.03)", border: "1px solid #222", borderRadius: "1rem", fontSize: "0.78rem", color: "#888" }}>🕐 {d}</span>)}
                  </div>}
                </div>
              )}

              {/* Spaces */}
              {(profile.spaces || []).length > 0 && (
                <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a1a", borderRadius: "0.5rem" }}>
                  <div style={{ fontSize: "0.7rem", color: "#555", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>SPACES & AREAS</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {(profile.spaces || []).map(s => <span key={s} style={{ padding: "0.3rem 0.7rem", background: "rgba(255,255,255,0.05)", border: "1px solid #333", borderRadius: "1rem", fontSize: "0.78rem", color: "#aaa" }}>{s}</span>)}
                  </div>
                </div>
              )}

              {/* Signatures */}
              {(profile.signatures || []).length > 0 && (
                <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a1a", borderRadius: "0.5rem" }}>
                  <div style={{ fontSize: "0.7rem", color: "#555", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>⭐ SIGNATURES & SPECIALTIES</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {(profile.signatures || []).map((s,i) => <span key={i} style={{ padding: "0.3rem 0.7rem", background: `${ac}15`, border: `1px solid ${ac}33`, borderRadius: "1rem", fontSize: "0.8rem", color: ac }}>{s}</span>)}
                  </div>
                </div>
              )}

              {/* Menu Items */}
              {(profile.menuItems || []).length > 0 && (
                <div style={{ gridColumn: "1/-1", padding: "1.25rem", background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a1a", borderRadius: "0.5rem" }}>
                  <div style={{ fontSize: "0.7rem", color: "#555", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>
                    MENU ITEMS DETECTED ({(profile.menuItems || []).length})
                    <span style={{ marginLeft: "0.75rem", color: "#444" }}>
                      🍽️ {(profile.menuItems || []).filter(m => m.category === "food").length} food
                      · 🍸 {(profile.menuItems || []).filter(m => m.category === "drink").length} drink
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", maxHeight: 200, overflow: "auto" }}>
                    {(profile.menuItems || []).map((m, i) => (
                      <span key={i} style={{
                        padding: "0.25rem 0.6rem",
                        background: m.category === "drink" ? "rgba(41,128,185,0.12)" : "rgba(255,255,255,0.04)",
                        border: m.category === "drink" ? "1px solid rgba(41,128,185,0.3)" : "1px solid #222",
                        borderRadius: "0.25rem", fontSize: "0.75rem",
                        color: m.category === "drink" ? "#5dade2" : "#888",
                      }}>{m.name}</span>
                    ))}
                  </div>
                </div>
              )}
            </>}

            {/* Top categories */}
            <div style={{ gridColumn: "1/-1", padding: "1.25rem", background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a1a", borderRadius: "0.5rem" }}>
              <div style={{ fontSize: "0.7rem", color: "#555", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>TOP MATCHED CATEGORIES</div>
              {(() => {
                const cs = computeBrandScores(profile);
                const sorted = Object.entries(cs).sort((a,b) => b[1]-a[1]).slice(0,10);
                const mx = sorted[0]?.[1] || 1;
                return <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {sorted.map(([cid, sc]) => {
                    const cat = CATEGORIES.find(c => c.id === parseInt(cid));
                    const pct = Math.round((sc/mx)*100);
                    return <div key={cid} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{ width: 140, fontSize: "0.78rem", color: "#aaa" }}>{cat?.icon} {cat?.name}</span>
                      <div style={{ flex: 1, height: 5, background: "#1a1a1a", borderRadius: 3, overflow: "hidden" }}><div style={{ width: `${pct}%`, height: "100%", background: ac, borderRadius: 3 }} /></div>
                      <span style={{ fontSize: "0.7rem", color: "#555", width: 35 }}>{sc.toFixed(1)}x</span>
                    </div>;
                  })}
                </div>;
              })()}
            </div>
          </div>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button onClick={() => { setScreen("upload"); setUploadError(""); }} style={{ padding: "0.75rem 1.5rem", background: `${ac}15`, border: `1px solid ${ac}44`, color: ac, cursor: "pointer", fontFamily: "inherit", borderRadius: "0.25rem" }}>📄 Re-Upload Brand Doc</button>
            <button onClick={() => { setScreen("wizard"); setWizStep(0); }} style={{ padding: "0.75rem 1.5rem", background: "transparent", border: "1px solid #444", color: "#aaa", cursor: "pointer", fontFamily: "inherit", borderRadius: "0.25rem" }}>✏️ Edit Profile</button>
            <button onClick={() => navigator.clipboard.writeText(JSON.stringify(profile, null, 2))} style={{ padding: "0.75rem 1.5rem", background: "transparent", border: "1px solid #444", color: "#aaa", cursor: "pointer", fontFamily: "inherit", borderRadius: "0.25rem" }}>📋 Export JSON</button>
          </div>
        </div>}
      </div>
    </div>
  );
}
