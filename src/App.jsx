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
  // ─── INDUSTRY EXPANSION: 488 styles across 16 verticals (IDs 1201-1688) ───
  [1201,"Guitar fretboard close-up finger work",6,["gear", "slow", "macro", "visual", "texture"]],
  [1202,"Drum stick impact slow-mo cymbal spray",5,["gear", "fast", "close", "audio", "payoff"]],
  [1203,"Vinyl record needle drop macro",6,["gear", "slow", "macro", "audio", "opener"]],
  [1204,"Soundboard fader push rack focus",3,["gear", "medium", "close", "visual", "rhythm"]],
  [1205,"Stage lights piercing through fog machine haze",4,["space", "fast", "wide", "visual", "opener"]],
  [1206,"Crowd sing-along split-screen performer POV",23,["people", "fast", "wide", "audio", "payoff"]],
  [1207,"Amp knob crank to distortion kick-in",11,["gear", "medium", "macro", "audio", "transition"]],
  [1208,"Pedalboard stomp chain reaction",11,["gear", "fast", "close", "audio", "rhythm"]],
  [1209,"Vocal booth isolation glass reflection",6,["person", "slow", "close", "visual", "texture"]],
  [1210,"DAW waveform timelapse beat building",15,["process", "fast", "close", "visual", "rhythm"]],
  [1211,"Guitar string vibration macro slow-mo",5,["gear", "slow", "macro", "visual", "texture"]],
  [1212,"Backstage tunnel walk to stage reveal",2,["person", "medium", "medium", "visual", "opener"]],
  [1213,"Drum skin ripple high-speed capture",5,["gear", "slow", "macro", "visual", "texture"]],
  [1214,"Setlist handwritten paper close-up",6,["brand", "slow", "close", "visual", "opener"]],
  [1215,"Microphone feedback screech visual pulse",11,["gear", "fast", "close", "audio", "payoff"]],
  [1216,"Tour bus window rolling landscape",3,["space", "slow", "wide", "visual", "transition"]],
  [1217,"Sound check empty venue atmosphere",13,["space", "slow", "wide", "audio", "opener"]],
  [1218,"Merch table fan interaction montage",14,["people", "medium", "medium", "visual", "closer"]],
  [1219,"Instrument case open reveal",2,["gear", "slow", "close", "visual", "opener"]],
  [1220,"Bass drop sync light flash",11,["space", "fast", "wide", "audio", "payoff"]],
  [1221,"Piano key hammer mechanism macro",5,["gear", "slow", "macro", "visual", "texture"]],
  [1222,"Album art to real scene match cut",2,["brand", "medium", "close", "visual", "transition"]],
  [1223,"Green room candid pre-show nerves",14,["person", "slow", "close", "visual", "opener"]],
  [1224,"Crowd mosaic aerial pull-back",19,["people", "fast", "wide", "visual", "payoff"]],
  [1225,"Mixing desk EQ sweep audio-visual sync",11,["gear", "medium", "close", "audio", "rhythm"]],
  [1226,"Speaker cone vibration extreme macro",5,["gear", "slow", "macro", "tactile", "texture"]],
  [1227,"Ticket stub nostalgic analog grain",16,["brand", "slow", "close", "visual", "opener"]],
  [1228,"Encore chant crowd energy build",11,["people", "fast", "wide", "audio", "payoff"]],
  [1229,"Roadie cable wrap BTS process",25,["process", "medium", "close", "visual", "closer"]],
  [1230,"Spotify stream counter rising timelapse",15,["brand", "fast", "close", "visual", "payoff"]],
  [1231,"Rehearsal room whiteboard song structure",25,["process", "slow", "medium", "visual", "texture"]],
  [1232,"Rapper hand gesture rhythmic close-up",14,["person", "fast", "close", "motion", "rhythm"]],
  [1233,"Turntable scratch crossfader sync",11,["gear", "fast", "close", "audio", "rhythm"]],
  [1234,"Festival wristband collection texture",6,["brand", "slow", "macro", "tactile", "texture"]],
  [1235,"Light rig programming BTS timelapse",25,["process", "fast", "wide", "visual", "rhythm"]],
  [1236,"Front door approach walkthrough entrance",3,["space", "medium", "wide", "visual", "opener"]],
  [1237,"Kitchen island orbital smooth glide",3,["space", "slow", "medium", "visual", "rhythm"]],
  [1238,"Window light golden hour room flood",4,["space", "slow", "wide", "visual", "texture"]],
  [1239,"Fireplace crackle ambient close-up",12,["space", "slow", "close", "audio", "texture"]],
  [1240,"Bathroom vanity mirror reflection pan",3,["space", "medium", "close", "visual", "rhythm"]],
  [1241,"Aerial property boundary pull-out reveal",19,["space", "slow", "wide", "visual", "opener"]],
  [1242,"Floor plan overlay to real room transition",8,["space", "medium", "wide", "visual", "transition"]],
  [1243,"Pool surface reflection sky shimmer",6,["space", "slow", "close", "visual", "texture"]],
  [1244,"Key turning in lock new home moment",14,["product", "slow", "macro", "audio", "opener"]],
  [1245,"Closet door slide storage reveal",2,["space", "medium", "close", "visual", "transition"]],
  [1246,"Staircase ascending tracking shot",3,["space", "medium", "medium", "motion", "transition"]],
  [1247,"Neighborhood street aerial flyover context",19,["space", "slow", "wide", "visual", "opener"]],
  [1248,"Backsplash tile texture macro pan",6,["space", "slow", "macro", "tactile", "texture"]],
  [1249,"Sunset balcony view time-lapse",5,["space", "slow", "wide", "visual", "closer"]],
  [1250,"Smart home device activation demo",7,["product", "medium", "close", "visual", "rhythm"]],
  [1251,"Walk-in pantry shelf detail scan",3,["space", "slow", "close", "visual", "texture"]],
  [1252,"Garage door open curb appeal reveal",2,["space", "medium", "wide", "visual", "opener"]],
  [1253,"Hardwood floor texture low angle glide",6,["space", "slow", "close", "tactile", "texture"]],
  [1254,"Countertop material swatch comparison",12,["product", "slow", "close", "visual", "rhythm"]],
  [1255,"Backyard entertaining space lifestyle vignette",14,["space", "medium", "wide", "visual", "payoff"]],
  [1256,"Before-after renovation split wipe",2,["space", "medium", "wide", "visual", "payoff"]],
  [1257,"Ceiling height vertical pan dramatic",3,["space", "slow", "wide", "visual", "texture"]],
  [1258,"Thermostat energy efficiency callout",8,["product", "medium", "close", "visual", "rhythm"]],
  [1259,"Drone orbit around property full 360",19,["space", "slow", "wide", "visual", "closer"]],
  [1260,"Light switch cascade room illumination",4,["space", "medium", "wide", "visual", "rhythm"]],
  [1261,"Blueprint to finished build match dissolve",2,["process", "medium", "wide", "visual", "transition"]],
  [1262,"Fixture close-up hardware detail",6,["product", "slow", "macro", "visual", "texture"]],
  [1263,"Mortgage rate graphic overlay lifestyle",8,["brand", "medium", "wide", "visual", "rhythm"]],
  [1264,"Virtual staging empty to furnished morph",15,["space", "medium", "wide", "visual", "transition"]],
  [1265,"Open house sign to door tracking follow",3,["brand", "medium", "wide", "visual", "opener"]],
  [1266,"Attic crawl space inspection POV",3,["space", "medium", "close", "visual", "texture"]],
  [1267,"Dumbbell rack pull slow-mo muscle tension",5,["gear", "slow", "close", "visual", "texture"]],
  [1268,"Treadmill speed ramp match-cut heartbeat",11,["gear", "fast", "medium", "audio", "rhythm"]],
  [1269,"Sweat droplet macro skin surface",6,["person", "slow", "macro", "visual", "texture"]],
  [1270,"Yoga pose transition fluid timelapse",5,["person", "slow", "wide", "motion", "rhythm"]],
  [1271,"Weight plate stack clang impact sync",11,["gear", "fast", "close", "audio", "payoff"]],
  [1272,"Mirror wall gym reflection symmetry",13,["space", "medium", "wide", "visual", "opener"]],
  [1273,"Protein shake blender vortex overhead",12,["drink", "fast", "close", "visual", "rhythm"]],
  [1274,"Boxing glove lace-up preparation ritual",14,["gear", "slow", "close", "visual", "opener"]],
  [1275,"Battle rope wave slow-mo ripple",5,["gear", "slow", "medium", "motion", "rhythm"]],
  [1276,"Chalk dust explosion clap hands",7,["person", "fast", "close", "visual", "opener"]],
  [1277,"Heart rate monitor climb graphic overlay",8,["person", "fast", "close", "visual", "rhythm"]],
  [1278,"Kettlebell swing arc tracking shot",3,["gear", "fast", "medium", "motion", "rhythm"]],
  [1279,"Ice bath plunge reaction close-up",14,["person", "fast", "close", "visual", "payoff"]],
  [1280,"Foam roller texture on muscle macro",6,["gear", "slow", "macro", "tactile", "texture"]],
  [1281,"Sunrise outdoor bootcamp silhouette wide",4,["people", "medium", "wide", "visual", "opener"]],
  [1282,"Meal prep container assembly line overhead",12,["food", "medium", "close", "visual", "rhythm"]],
  [1283,"Spin class bike cadence sync music",11,["gear", "fast", "medium", "audio", "rhythm"]],
  [1284,"Stretching flexibility progression split-screen",23,["person", "slow", "medium", "visual", "payoff"]],
  [1285,"Gym floor rubber texture low angle",6,["space", "slow", "close", "tactile", "texture"]],
  [1286,"Rep counter graphic overlay pump set",8,["person", "fast", "close", "visual", "rhythm"]],
  [1287,"Sauna steam rising atmospheric slow-mo",7,["space", "slow", "medium", "thermal", "texture"]],
  [1288,"Before-after body transformation morph",2,["person", "medium", "medium", "visual", "payoff"]],
  [1289,"Jump rope cadence feet-only close-up",5,["person", "fast", "close", "motion", "rhythm"]],
  [1290,"Smoothie ingredient toss aerial catch",12,["food", "fast", "close", "visual", "rhythm"]],
  [1291,"Resistance band stretch snap release",5,["gear", "fast", "close", "motion", "payoff"]],
  [1292,"Class instructor countdown motivational",14,["person", "fast", "close", "audio", "payoff"]],
  [1293,"Recovery room dim lighting meditation",4,["space", "slow", "wide", "visual", "closer"]],
  [1294,"Personal record celebration fist pump",14,["person", "fast", "close", "visual", "payoff"]],
  [1295,"Barbell loading plate-by-plate build-up",25,["gear", "medium", "close", "audio", "opener"]],
  [1296,"Pool lap underwater camera glide",3,["person", "medium", "medium", "visual", "rhythm"]],
  [1297,"Wearable fitness tracker data pulse",15,["gear", "medium", "macro", "visual", "rhythm"]],
  [1298,"Lipstick bullet twist-up macro",12,["product", "slow", "macro", "visual", "opener"]],
  [1299,"Foundation blend skin texture transition",6,["product", "slow", "macro", "tactile", "texture"]],
  [1300,"Hair color transformation reveal mirror",2,["person", "medium", "close", "visual", "payoff"]],
  [1301,"Eyeshadow palette swipe finger swatch",12,["product", "slow", "macro", "tactile", "texture"]],
  [1302,"Fabric drape fall slow-mo silk cascade",5,["product", "slow", "close", "visual", "texture"]],
  [1303,"Runway walk low-angle shoe strut",3,["person", "fast", "close", "motion", "rhythm"]],
  [1304,"Perfume spritz mist cloud backlit",7,["product", "slow", "close", "visual", "texture"]],
  [1305,"Outfit spin 360 full look reveal",20,["person", "medium", "medium", "visual", "payoff"]],
  [1306,"Nail art brush stroke detail macro",12,["process", "slow", "macro", "visual", "texture"]],
  [1307,"Zipper pull close-up garment detail",6,["product", "slow", "macro", "audio", "texture"]],
  [1308,"Vanity mirror ring light reflection setup",4,["space", "medium", "close", "visual", "opener"]],
  [1309,"Contour sculpt before-after face split",2,["person", "medium", "close", "visual", "payoff"]],
  [1310,"Skincare serum dropper golden drip",12,["product", "slow", "macro", "visual", "texture"]],
  [1311,"Closet outfit selection montage swipe",24,["product", "fast", "medium", "visual", "rhythm"]],
  [1312,"Eyelash curl dramatic eye open reveal",2,["person", "slow", "macro", "visual", "payoff"]],
  [1313,"Shoe unboxing tissue paper unfold",2,["product", "slow", "close", "audio", "opener"]],
  [1314,"Flat lay outfit grid overhead arrange",12,["product", "slow", "wide", "visual", "opener"]],
  [1315,"Hair straightener steam sizzle close-up",7,["gear", "slow", "close", "audio", "texture"]],
  [1316,"Jewelry sparkle catch-light rotation",4,["product", "slow", "macro", "visual", "texture"]],
  [1317,"Blush brush powder puff cloud",7,["product", "medium", "close", "visual", "rhythm"]],
  [1318,"GRWM mirror reflection time-lapse compress",5,["person", "fast", "medium", "visual", "rhythm"]],
  [1319,"Sewing machine needle fabric feed macro",25,["process", "slow", "macro", "visual", "texture"]],
  [1320,"Color palette moodboard match-cut to outfit",10,["brand", "medium", "close", "visual", "transition"]],
  [1321,"Mascara wand pull-out product detail",12,["product", "slow", "macro", "visual", "texture"]],
  [1322,"Haul bag dump table spill reveal",2,["product", "fast", "medium", "visual", "opener"]],
  [1323,"Pattern textile weave macro texture",6,["product", "slow", "macro", "tactile", "texture"]],
  [1324,"Dressing room curtain pull outfit reveal",2,["person", "medium", "medium", "visual", "payoff"]],
  [1325,"Lip gloss application reflective shine macro",12,["product", "slow", "macro", "visual", "texture"]],
  [1326,"Stitching detail hand-sewn craft close-up",25,["process", "slow", "macro", "visual", "texture"]],
  [1327,"Fashion show front row audience reaction",23,["people", "fast", "medium", "visual", "rhythm"]],
  [1328,"Engine bay reveal hood pop-up",2,["product", "medium", "close", "audio", "opener"]],
  [1329,"Wheel spin burnout smoke cloud",7,["product", "fast", "close", "visual", "payoff"]],
  [1330,"Paint correction swirl removal 50/50",12,["process", "slow", "macro", "visual", "payoff"]],
  [1331,"Exhaust note rev cold start audio",11,["product", "medium", "close", "audio", "opener"]],
  [1332,"Ceramic coating water bead sheeting",6,["product", "slow", "macro", "visual", "payoff"]],
  [1333,"Dashboard gauge cluster startup sequence",2,["product", "medium", "close", "visual", "opener"]],
  [1334,"Suspension compression pothole slow-mo",5,["product", "slow", "close", "motion", "texture"]],
  [1335,"Detailing foam cannon coverage spray",7,["process", "medium", "wide", "visual", "opener"]],
  [1336,"Headlight DRL sequential animation",4,["product", "slow", "close", "visual", "texture"]],
  [1337,"Tire tread texture macro rotation",6,["product", "slow", "macro", "tactile", "texture"]],
  [1338,"Rolling shot highway pace car tracking",3,["product", "fast", "medium", "motion", "rhythm"]],
  [1339,"Interior leather stitch detail scan",6,["product", "slow", "macro", "tactile", "texture"]],
  [1340,"Car wash tunnel light play through glass",4,["product", "medium", "close", "visual", "rhythm"]],
  [1341,"Turbo spool whistle boost build",11,["gear", "fast", "close", "audio", "payoff"]],
  [1342,"Door handle approach pull chrome reflection",6,["product", "slow", "close", "visual", "opener"]],
  [1343,"Undercarriage low-angle drive-over POV",3,["product", "fast", "close", "motion", "rhythm"]],
  [1344,"Dyno pull power graph overlay sync",8,["product", "fast", "close", "audio", "payoff"]],
  [1345,"Key fob unlock chirp light flash",11,["product", "medium", "medium", "audio", "opener"]],
  [1346,"Brake caliper color pop selective desat",10,["product", "slow", "close", "visual", "texture"]],
  [1347,"Windshield rain bead POV interior drive",6,["space", "slow", "wide", "visual", "texture"]],
  [1348,"Garage lift ascending reveal underside",2,["product", "slow", "wide", "visual", "transition"]],
  [1349,"Shift knob gear change palm grip close",14,["person", "fast", "close", "tactile", "rhythm"]],
  [1350,"Clay bar glide surface decontamination",25,["process", "slow", "macro", "tactile", "texture"]],
  [1351,"Speedometer needle climb acceleration sync",11,["product", "fast", "close", "visual", "payoff"]],
  [1352,"Wrap install squeegee smooth bubble-free",25,["process", "slow", "close", "visual", "rhythm"]],
  [1353,"Auction lot walk classic car reveal",3,["product", "medium", "wide", "visual", "opener"]],
  [1354,"Oil change pour golden flow close-up",12,["process", "slow", "close", "visual", "texture"]],
  [1355,"Steering wheel hand-over-hand curve tracking",14,["person", "medium", "close", "motion", "rhythm"]],
  [1356,"Convertible top retract mechanical unfold",5,["product", "medium", "medium", "motion", "transition"]],
  [1357,"Exhaust tip carbon fiber texture detail",6,["product", "slow", "macro", "visual", "texture"]],
  [1358,"Concrete pour flow spread timelapse",5,["process", "medium", "wide", "visual", "rhythm"]],
  [1359,"Nail gun rapid fire framing sync",11,["gear", "fast", "close", "audio", "rhythm"]],
  [1360,"Level bubble center precision close-up",6,["gear", "slow", "macro", "visual", "texture"]],
  [1361,"Scaffolding assembly timelapse ground to sky",5,["process", "fast", "wide", "visual", "opener"]],
  [1362,"Welding spark shower slow-mo cascade",7,["process", "slow", "close", "visual", "texture"]],
  [1363,"Blueprint unroll on sawhorse reveal",2,["process", "slow", "close", "visual", "opener"]],
  [1364,"Excavator bucket scoop dirt dramatic",5,["gear", "medium", "wide", "visual", "rhythm"]],
  [1365,"Tile grout line precision detail macro",6,["process", "slow", "macro", "visual", "texture"]],
  [1366,"Crane lift steel beam aerial wide",19,["gear", "slow", "wide", "visual", "payoff"]],
  [1367,"Sawdust spray blade cut slow-mo",5,["gear", "fast", "close", "visual", "rhythm"]],
  [1368,"Plumb line drop straight edge verify",6,["gear", "slow", "close", "visual", "texture"]],
  [1369,"Drywall mud skim coat smooth finish",25,["process", "slow", "close", "tactile", "texture"]],
  [1370,"Pipe thread cutting lathe spin",5,["gear", "medium", "close", "visual", "rhythm"]],
  [1371,"Foundation to roof progress drone orbit",19,["space", "medium", "wide", "visual", "payoff"]],
  [1372,"Tool belt equip morning ritual",14,["gear", "medium", "close", "visual", "opener"]],
  [1373,"Electrical wire strip crimp terminate",25,["process", "medium", "macro", "visual", "rhythm"]],
  [1374,"Hardhat POV first-person site walk",3,["space", "medium", "wide", "visual", "opener"]],
  [1375,"Demolition wall smash dust explosion",7,["process", "fast", "wide", "visual", "payoff"]],
  [1376,"Laser level grid line projection room",22,["gear", "slow", "wide", "visual", "texture"]],
  [1377,"Paint roller wall coverage satisfying",25,["process", "medium", "close", "visual", "rhythm"]],
  [1378,"Cabinet install hinge align precision",25,["process", "slow", "close", "visual", "texture"]],
  [1379,"Sunrise jobsite crew arrival wide",4,["people", "slow", "wide", "visual", "opener"]],
  [1380,"Thermal imaging insulation check reveal",22,["space", "medium", "wide", "thermal", "texture"]],
  [1381,"Backhoe trench dig aerial overhead",19,["gear", "medium", "wide", "visual", "rhythm"]],
  [1382,"Mortar spread brick lay rhythm sequence",11,["process", "medium", "close", "visual", "rhythm"]],
  [1383,"Copper pipe solder flame glow detail",7,["process", "slow", "close", "visual", "texture"]],
  [1384,"Measuring tape snap retract audio sync",11,["gear", "fast", "close", "audio", "rhythm"]],
  [1385,"Rebar grid pour-ready aerial pattern",19,["process", "slow", "wide", "visual", "texture"]],
  [1386,"Truck tailgate tool load morning prep",25,["gear", "medium", "medium", "visual", "opener"]],
  [1387,"Floor epoxy pour self-leveling spread",5,["process", "slow", "close", "visual", "texture"]],
  [1388,"Framing square corner check precision",6,["gear", "slow", "close", "visual", "texture"]],
  [1389,"Surgical glove snap-on sterile prep",14,["gear", "medium", "close", "audio", "opener"]],
  [1390,"Microscope slide focus rack through cells",22,["process", "slow", "macro", "visual", "texture"]],
  [1391,"X-ray light box reveal scan detail",4,["product", "slow", "close", "visual", "texture"]],
  [1392,"Dental impression mold set close-up",25,["process", "slow", "close", "visual", "texture"]],
  [1393,"Heartbeat monitor beep visual pulse sync",11,["gear", "medium", "close", "audio", "rhythm"]],
  [1394,"Lab coat walk hallway tracking authority",3,["person", "medium", "medium", "visual", "opener"]],
  [1395,"Prescription bottle label detail scan",12,["product", "slow", "macro", "visual", "texture"]],
  [1396,"Surgical instrument tray layout overhead",12,["gear", "slow", "close", "visual", "opener"]],
  [1397,"Waiting room ambient patient perspective",13,["space", "slow", "wide", "visual", "opener"]],
  [1398,"Blood pressure cuff inflate arm compress",25,["gear", "medium", "close", "visual", "rhythm"]],
  [1399,"Stethoscope chest listen focus face",14,["person", "slow", "close", "audio", "texture"]],
  [1400,"MRI machine slide-in patient POV",3,["gear", "slow", "close", "visual", "transition"]],
  [1401,"Pharmacy pill count tray precision",25,["process", "slow", "close", "visual", "rhythm"]],
  [1402,"Hand sanitizer dispenser foam spread",7,["process", "medium", "close", "visual", "rhythm"]],
  [1403,"Ultrasound wand gel slide screen reveal",22,["gear", "slow", "close", "visual", "payoff"]],
  [1404,"Physical therapy resistance band stretch",14,["person", "medium", "medium", "visual", "rhythm"]],
  [1405,"Eye exam light pupil dilation macro",22,["person", "slow", "macro", "visual", "texture"]],
  [1406,"Vaccine injection arm close-up reassurance",14,["process", "medium", "close", "visual", "rhythm"]],
  [1407,"Hospital corridor long perspective depth",13,["space", "slow", "wide", "visual", "opener"]],
  [1408,"Scrub cap tie-back pre-surgery ritual",14,["person", "medium", "close", "visual", "opener"]],
  [1409,"Defibrillator charge beep paddles ready",11,["gear", "fast", "close", "audio", "payoff"]],
  [1410,"Patient chart data overlay vital signs",8,["process", "medium", "close", "visual", "rhythm"]],
  [1411,"Therapy session empathetic nod close-up",14,["person", "slow", "close", "visual", "texture"]],
  [1412,"Ambulance light bar strobe emergency",4,["gear", "fast", "medium", "visual", "opener"]],
  [1413,"Wheelchair assist compassionate care moment",14,["people", "slow", "medium", "visual", "closer"]],
  [1414,"Lab centrifuge spin sample separation",5,["gear", "medium", "close", "visual", "rhythm"]],
  [1415,"Newborn weight scale first measurement",14,["person", "slow", "close", "visual", "payoff"]],
  [1416,"Recovery room curtain pull patient check",2,["space", "medium", "close", "visual", "transition"]],
  [1417,"Pill organizer weekly fill overhead",25,["process", "slow", "close", "visual", "rhythm"]],
  [1418,"Telehealth screen split doctor-patient",23,["people", "medium", "close", "visual", "rhythm"]],
  [1419,"Gavel strike desk impact authority",11,["gear", "fast", "close", "audio", "opener"]],
  [1420,"Legal brief page flip scan speed read",5,["product", "fast", "close", "visual", "rhythm"]],
  [1421,"Office nameplate door approach reveal",2,["brand", "slow", "close", "visual", "opener"]],
  [1422,"Handshake deal close corporate trust",14,["people", "medium", "close", "visual", "payoff"]],
  [1423,"Contract signature pen stroke macro",12,["process", "slow", "macro", "visual", "payoff"]],
  [1424,"Bookshelf law volume pull focus",6,["space", "slow", "close", "visual", "texture"]],
  [1425,"Courtroom wide establishing shot gravity",13,["space", "slow", "wide", "visual", "opener"]],
  [1426,"Document stamp notarize seal press",7,["process", "medium", "close", "audio", "rhythm"]],
  [1427,"Conference table overhead meeting layout",13,["space", "slow", "wide", "visual", "opener"]],
  [1428,"Whiteboard strategy session diagram build",25,["process", "medium", "medium", "visual", "rhythm"]],
  [1429,"Business card exchange professional detail",14,["brand", "medium", "close", "visual", "texture"]],
  [1430,"Elevator pitch hallway walk-and-talk",3,["person", "medium", "medium", "audio", "rhythm"]],
  [1431,"Diploma frame wall credential display",6,["brand", "slow", "close", "visual", "texture"]],
  [1432,"Filing cabinet drawer evidence pull",2,["process", "medium", "close", "visual", "transition"]],
  [1433,"Deposition transcript scrolling text overlay",1,["process", "medium", "close", "visual", "rhythm"]],
  [1434,"Scale of justice balance metaphor close",12,["brand", "slow", "close", "visual", "texture"]],
  [1435,"Corner office window city view authority",13,["space", "slow", "wide", "visual", "opener"]],
  [1436,"Client consultation empathetic listen nod",14,["person", "slow", "close", "visual", "texture"]],
  [1437,"Laptop screen case research data scroll",15,["process", "medium", "close", "visual", "rhythm"]],
  [1438,"Team huddle pre-trial strategy circle",14,["people", "medium", "medium", "visual", "opener"]],
  [1439,"Leather briefcase clasp open document pull",2,["gear", "slow", "close", "audio", "opener"]],
  [1440,"Verdict announcement reaction face close",14,["person", "fast", "close", "visual", "payoff"]],
  [1441,"Clock ticking deadline pressure cutaway",11,["gear", "slow", "close", "audio", "rhythm"]],
  [1442,"Witness stand perspective courtroom POV",3,["space", "medium", "wide", "visual", "texture"]],
  [1443,"Red seal wax stamp document authentication",7,["process", "slow", "macro", "visual", "texture"]],
  [1444,"Post-meeting corridor debrief walk",3,["people", "medium", "medium", "visual", "closer"]],
  [1445,"Bar exam prep study stack depth of field",12,["product", "slow", "close", "visual", "texture"]],
  [1446,"Firm lobby logo reception authority",18,["brand", "slow", "wide", "visual", "opener"]],
  [1447,"PowerPoint to speaker match-cut presentation",2,["person", "medium", "medium", "visual", "transition"]],
  [1448,"Pen click nervous habit anticipation detail",14,["person", "slow", "macro", "audio", "texture"]],
  [1449,"Tractor plowing row furrow aerial parallel",19,["gear", "slow", "wide", "visual", "opener"]],
  [1450,"Seed drop soil close-up planting macro",12,["process", "slow", "macro", "visual", "texture"]],
  [1451,"Irrigation pivot sprinkler rainbow mist",7,["gear", "slow", "wide", "visual", "texture"]],
  [1452,"Harvest combine grain pour golden flow",12,["process", "medium", "close", "visual", "payoff"]],
  [1453,"Sunrise barn silhouette wide establishing",4,["space", "slow", "wide", "visual", "opener"]],
  [1454,"Calf feeding bucket nuzzle close-up",14,["animal", "slow", "close", "visual", "texture"]],
  [1455,"Soil crumble hand texture test",6,["process", "slow", "macro", "tactile", "texture"]],
  [1456,"Grain silo fill aerial overhead pour",19,["space", "medium", "wide", "visual", "rhythm"]],
  [1457,"Chicken coop egg collection basket fill",25,["process", "slow", "close", "visual", "rhythm"]],
  [1458,"Fence line repair post hole dig",25,["process", "medium", "medium", "visual", "rhythm"]],
  [1459,"Crop row drone flyover symmetry",19,["space", "slow", "wide", "visual", "texture"]],
  [1460,"Milk parlor udder attach automation",25,["process", "medium", "close", "visual", "rhythm"]],
  [1461,"Hay bale stack barn interior depth",13,["space", "slow", "wide", "visual", "texture"]],
  [1462,"Fruit pick hand twist stem snap",12,["process", "slow", "close", "audio", "rhythm"]],
  [1463,"Greenhouse humidity condensation glass drip",6,["space", "slow", "macro", "visual", "texture"]],
  [1464,"Weather vane spin wind indicator wide",7,["gear", "slow", "medium", "visual", "texture"]],
  [1465,"Livestock auction ring bid paddle raise",14,["people", "fast", "medium", "audio", "rhythm"]],
  [1466,"Farm truck dust trail sunrise drive",3,["gear", "medium", "wide", "visual", "opener"]],
  [1467,"Root vegetable pull earth to hand reveal",2,["process", "medium", "close", "visual", "payoff"]],
  [1468,"Beehive frame pull honey comb detail",12,["process", "slow", "close", "visual", "texture"]],
  [1469,"Barn cat mouser patrol tracking shot",3,["animal", "slow", "medium", "visual", "rhythm"]],
  [1470,"Grain moisture test crush sample close",25,["process", "slow", "macro", "visual", "texture"]],
  [1471,"Tractor cab instrument panel startup",2,["gear", "medium", "close", "visual", "opener"]],
  [1472,"Crop duster aerial spray pass flyover",19,["gear", "fast", "wide", "visual", "rhythm"]],
  [1473,"Fermentation tank bubble airlock rhythm",12,["process", "slow", "close", "audio", "rhythm"]],
  [1474,"Dried herb bundle hanging barn rafter",6,["product", "slow", "close", "visual", "texture"]],
  [1475,"Sheep shearing fleece peel reveal",25,["process", "medium", "close", "visual", "payoff"]],
  [1476,"Farm-to-table plate final garnish close",12,["food", "slow", "close", "visual", "closer"]],
  [1477,"Windmill blade rotation sky timelapse",5,["gear", "slow", "wide", "visual", "texture"]],
  [1478,"Barn owl perch night vision specialty",22,["animal", "slow", "medium", "visual", "texture"]],
  [1479,"Code terminal scroll syntax highlight cascade",15,["process", "fast", "close", "visual", "rhythm"]],
  [1480,"SaaS dashboard metric counter tick-up",15,["product", "medium", "close", "visual", "payoff"]],
  [1481,"Server rack LED blink pattern array",4,["gear", "slow", "close", "visual", "texture"]],
  [1482,"App UI interaction finger tap flow",15,["product", "medium", "close", "visual", "rhythm"]],
  [1483,"Keyboard typing ASMR mechanical switch",11,["gear", "medium", "close", "audio", "rhythm"]],
  [1484,"Circuit board macro chip landscape",6,["gear", "slow", "macro", "visual", "texture"]],
  [1485,"Wireframe to rendered UI morph transition",2,["product", "medium", "close", "visual", "transition"]],
  [1486,"Startup whiteboard pivot brainstorm chaos",25,["process", "fast", "medium", "visual", "rhythm"]],
  [1487,"Cable management rack tidy before-after",2,["process", "slow", "close", "visual", "payoff"]],
  [1488,"Deploy pipeline green checkmarks cascade",15,["process", "fast", "close", "visual", "payoff"]],
  [1489,"Holographic data visualization 3D float",15,["product", "slow", "medium", "visual", "texture"]],
  [1490,"Desk setup cable-free minimal overhead",12,["space", "slow", "wide", "visual", "opener"]],
  [1491,"GitHub commit graph contribution heatmap",8,["process", "medium", "close", "visual", "rhythm"]],
  [1492,"Robot arm pick-and-place automation loop",5,["gear", "medium", "medium", "motion", "rhythm"]],
  [1493,"VR headset put-on world reveal",2,["gear", "medium", "close", "visual", "opener"]],
  [1494,"3D printer layer-by-layer timelapse build",5,["gear", "slow", "close", "visual", "rhythm"]],
  [1495,"Microchip wafer macro rainbow refraction",6,["product", "slow", "macro", "visual", "texture"]],
  [1496,"Team standup video grid remote culture",23,["people", "medium", "close", "visual", "rhythm"]],
  [1497,"Loading spinner to reveal product launch",2,["product", "medium", "close", "visual", "payoff"]],
  [1498,"Ethernet cable click port insert ASMR",11,["gear", "medium", "macro", "audio", "texture"]],
  [1499,"Dark mode toggle interface switch",10,["product", "medium", "close", "visual", "transition"]],
  [1500,"Drone delivery package drop futuristic",19,["product", "medium", "wide", "visual", "payoff"]],
  [1501,"Screen reflection glasses developer face",4,["person", "slow", "close", "visual", "texture"]],
  [1502,"API call response time graph pulse",8,["process", "fast", "close", "visual", "rhythm"]],
  [1503,"Unboxing tech product peel plastic reveal",2,["product", "slow", "close", "audio", "opener"]],
  [1504,"Data center aisle walk cooling hum",13,["space", "slow", "wide", "audio", "opener"]],
  [1505,"Multi-monitor setup panoramic workspace",13,["space", "slow", "wide", "visual", "opener"]],
  [1506,"Raspberry Pi project wire macro chaos",6,["gear", "slow", "macro", "visual", "texture"]],
  [1507,"Cloud infrastructure animated diagram overlay",8,["process", "medium", "wide", "visual", "rhythm"]],
  [1508,"Laptop hinge open morning routine start",2,["gear", "medium", "close", "visual", "opener"]],
  [1509,"Chalkboard equation write dramatic reveal",1,["process", "medium", "close", "visual", "rhythm"]],
  [1510,"Student lightbulb moment reaction close-up",14,["person", "fast", "close", "visual", "payoff"]],
  [1511,"Library book spine scan tracking dolly",3,["space", "slow", "close", "visual", "texture"]],
  [1512,"Science experiment reaction bubble fizz",7,["process", "fast", "close", "visual", "payoff"]],
  [1513,"Graduation cap toss slow-mo sky release",5,["people", "slow", "wide", "visual", "payoff"]],
  [1514,"Whiteboard marker squeak diagram build",25,["process", "medium", "close", "audio", "rhythm"]],
  [1515,"Textbook page flip study montage",5,["product", "fast", "close", "visual", "rhythm"]],
  [1516,"Classroom hand raise eager participation",14,["people", "medium", "medium", "visual", "rhythm"]],
  [1517,"Lab goggles on safety prep ritual",14,["person", "medium", "close", "visual", "opener"]],
  [1518,"Globe spin finger stop destination pick",7,["gear", "medium", "close", "motion", "transition"]],
  [1519,"Microscope eyepiece student discovery",22,["person", "slow", "close", "visual", "texture"]],
  [1520,"Campus quad aerial autumn colors wide",19,["space", "slow", "wide", "visual", "opener"]],
  [1521,"Pencil sketch to digital render transition",2,["process", "medium", "close", "visual", "transition"]],
  [1522,"Backpack unzip supplies tumble ASMR",11,["gear", "medium", "close", "audio", "opener"]],
  [1523,"Test grade reveal paper flip moment",2,["product", "fast", "close", "visual", "payoff"]],
  [1524,"Pottery wheel clay center spin form",25,["process", "slow", "close", "motion", "rhythm"]],
  [1525,"Periodic table element highlight glow",8,["product", "medium", "close", "visual", "texture"]],
  [1526,"Music class instrument first note attempt",14,["person", "slow", "close", "audio", "texture"]],
  [1527,"Robotics club bot test run arena",25,["gear", "fast", "medium", "visual", "payoff"]],
  [1528,"Lecture hall tiered seating wide depth",13,["space", "slow", "wide", "visual", "opener"]],
  [1529,"Art studio paint splatter creative mess",7,["space", "medium", "close", "visual", "texture"]],
  [1530,"Diploma scroll unfurl name reveal",2,["product", "slow", "close", "visual", "payoff"]],
  [1531,"Flash card rapid study flip sequence",5,["product", "fast", "close", "visual", "rhythm"]],
  [1532,"School bell ring hallway rush energy",11,["space", "fast", "wide", "audio", "transition"]],
  [1533,"3D skeleton model anatomy rotation",21,["product", "slow", "medium", "visual", "texture"]],
  [1534,"Student project presentation nervous start",14,["person", "medium", "medium", "visual", "opener"]],
  [1535,"Calligraphy pen ink flow letter form",12,["process", "slow", "macro", "visual", "texture"]],
  [1536,"Chemistry titration color change moment",7,["process", "slow", "close", "visual", "payoff"]],
  [1537,"Locker combination spin open pull reveal",2,["gear", "medium", "close", "audio", "transition"]],
  [1538,"Study group table overhead notes spread",14,["people", "slow", "wide", "visual", "texture"]],
  [1539,"Shopping bag tissue reveal product pull",2,["product", "medium", "close", "visual", "opener"]],
  [1540,"Price tag flip sale callout pop",1,["product", "fast", "close", "visual", "rhythm"]],
  [1541,"Clothing rack swipe browse selection",3,["product", "fast", "medium", "visual", "rhythm"]],
  [1542,"Package unboxing knife slit tape pull",2,["product", "slow", "close", "audio", "opener"]],
  [1543,"Product turntable 360 spin seamless loop",20,["product", "slow", "medium", "visual", "rhythm"]],
  [1544,"Add-to-cart button tap screen record",24,["product", "fast", "close", "visual", "payoff"]],
  [1545,"Warehouse shelf pick-pack process flow",25,["process", "fast", "wide", "visual", "rhythm"]],
  [1546,"Fabric texture hand-feel squeeze test",6,["product", "slow", "close", "tactile", "texture"]],
  [1547,"Window display mannequin style tableau",13,["space", "slow", "wide", "visual", "opener"]],
  [1548,"Barcode scan beep inventory check",11,["process", "fast", "close", "audio", "rhythm"]],
  [1549,"Fitting room mirror outfit approval nod",14,["person", "medium", "medium", "visual", "payoff"]],
  [1550,"Cash register drawer open transaction close",11,["gear", "medium", "close", "audio", "closer"]],
  [1551,"Stack and fold display table visual merch",25,["process", "medium", "close", "visual", "rhythm"]],
  [1552,"Customer review screenshot scroll social proof",24,["brand", "medium", "close", "visual", "rhythm"]],
  [1553,"Delivery truck door roll-up warehouse load",2,["gear", "medium", "wide", "visual", "opener"]],
  [1554,"Color swatch variation grid comparison",12,["product", "slow", "close", "visual", "texture"]],
  [1555,"Flash sale countdown timer urgency overlay",8,["brand", "fast", "close", "visual", "rhythm"]],
  [1556,"Store aisle overhead bird-eye symmetry",19,["space", "slow", "wide", "visual", "texture"]],
  [1557,"Influencer try-on reaction genuine moment",24,["person", "medium", "medium", "visual", "payoff"]],
  [1558,"Packing station bubble wrap ASMR ship",11,["process", "medium", "close", "audio", "rhythm"]],
  [1559,"Product comparison side-by-side split frame",23,["product", "medium", "close", "visual", "rhythm"]],
  [1560,"Loyalty card stamp punch satisfying fill",7,["brand", "slow", "close", "visual", "closer"]],
  [1561,"Email notification order confirmed screen",24,["brand", "fast", "close", "visual", "payoff"]],
  [1562,"Return label peel stick shipping prep",25,["process", "medium", "close", "visual", "rhythm"]],
  [1563,"Storefront neon sign flicker night exterior",4,["brand", "slow", "wide", "visual", "opener"]],
  [1564,"Checkout counter interaction smile exchange",14,["people", "medium", "medium", "visual", "closer"]],
  [1565,"Seasonal display changeover timelapse",17,["process", "fast", "wide", "visual", "transition"]],
  [1566,"Shopping cart fill cumulative product stack",9,["product", "medium", "medium", "visual", "rhythm"]],
  [1567,"Gift wrapping fold crease ribbon curl",25,["process", "slow", "close", "visual", "closer"]],
  [1568,"QR code scan phone point activate",15,["process", "fast", "close", "visual", "transition"]],
  [1569,"First dance spotlight circle warm glow",4,["people", "slow", "medium", "visual", "payoff"]],
  [1570,"Ring box open sparkle macro reveal",2,["product", "slow", "macro", "visual", "payoff"]],
  [1571,"Veil lift face reveal ceremony moment",2,["person", "slow", "close", "visual", "payoff"]],
  [1572,"Bouquet toss slow-mo catch celebration",5,["people", "fast", "medium", "visual", "payoff"]],
  [1573,"Table setting detail place card macro",12,["product", "slow", "macro", "visual", "texture"]],
  [1574,"Venue empty to decorated timelapse transform",5,["space", "fast", "wide", "visual", "transition"]],
  [1575,"Champagne cork pop fizz pour cascade",7,["drink", "fast", "close", "audio", "payoff"]],
  [1576,"Cake cutting first slice serve close",12,["food", "slow", "close", "visual", "rhythm"]],
  [1577,"Guest book signature pen close-up",12,["process", "slow", "macro", "visual", "texture"]],
  [1578,"Aisle walk tracking shot following behind",3,["person", "slow", "medium", "visual", "opener"]],
  [1579,"Sparkler exit tunnel couple walkthrough",7,["people", "medium", "wide", "visual", "closer"]],
  [1580,"Getting ready button hook zipper pull",14,["person", "slow", "close", "visual", "opener"]],
  [1581,"Invitation suite flat lay detail styling",12,["product", "slow", "close", "visual", "opener"]],
  [1582,"DJ booth crowd reaction bass drop sync",11,["people", "fast", "wide", "audio", "payoff"]],
  [1583,"Flower arrangement stem cut prep BTS",25,["process", "medium", "close", "visual", "rhythm"]],
  [1584,"Toast speech reaction crowd laughter",14,["people", "medium", "medium", "audio", "payoff"]],
  [1585,"Confetti cannon burst slow-mo rain",7,["people", "slow", "wide", "visual", "payoff"]],
  [1586,"Sunset ceremony golden hour backlit vows",4,["people", "slow", "wide", "visual", "payoff"]],
  [1587,"Dance floor overhead kaleidoscope motion",19,["people", "fast", "wide", "visual", "rhythm"]],
  [1588,"Photo booth strip rapid flash sequence",23,["people", "fast", "close", "visual", "rhythm"]],
  [1589,"Centerpiece candle flame flicker ambient",4,["space", "slow", "close", "visual", "texture"]],
  [1590,"Bridesmaid lineup reveal dress color pop",10,["people", "medium", "wide", "visual", "payoff"]],
  [1591,"Venue exterior drone approach establishing",19,["space", "slow", "wide", "visual", "opener"]],
  [1592,"Ribbon cutting ceremony scissor snap",7,["process", "fast", "close", "audio", "payoff"]],
  [1593,"Place setting name card calligraphy detail",1,["product", "slow", "macro", "visual", "texture"]],
  [1594,"Sendoff car decorated tin cans drag",7,["people", "medium", "wide", "audio", "closer"]],
  [1595,"Cocktail hour ambient crowd soft focus",10,["people", "slow", "wide", "visual", "rhythm"]],
  [1596,"Ring exchange hand close-up ceremony",12,["product", "slow", "macro", "visual", "payoff"]],
  [1597,"Lantern release night sky float away",7,["people", "slow", "wide", "visual", "closer"]],
  [1598,"Bridal suite getting ready mirror moment",14,["person", "slow", "medium", "visual", "opener"]],
  [1599,"Volunteer hands building community montage",14,["people", "medium", "close", "visual", "rhythm"]],
  [1600,"Donation counter rising graphic overlay",8,["brand", "fast", "close", "visual", "payoff"]],
  [1601,"Before-after community impact split screen",23,["space", "medium", "wide", "visual", "payoff"]],
  [1602,"Thank you card handwrite personal close",12,["process", "slow", "macro", "visual", "closer"]],
  [1603,"Beneficiary story portrait slow push-in",3,["person", "slow", "close", "visual", "opener"]],
  [1604,"Supply distribution line human chain pass",14,["people", "medium", "wide", "visual", "rhythm"]],
  [1605,"Gala event table setting elegant wide",17,["space", "slow", "wide", "visual", "opener"]],
  [1606,"Charity run starting line crowd energy",14,["people", "fast", "wide", "visual", "opener"]],
  [1607,"Food bank shelf stock volunteer fill",25,["process", "medium", "medium", "visual", "rhythm"]],
  [1608,"Mission statement typography scroll reveal",1,["brand", "medium", "close", "visual", "opener"]],
  [1609,"Children beneficiary smile genuine candid",14,["person", "slow", "close", "visual", "payoff"]],
  [1610,"Fundraiser thermometer fill graphic climb",8,["brand", "medium", "close", "visual", "payoff"]],
  [1611,"Habitat build wall raise team effort",14,["people", "medium", "wide", "visual", "payoff"]],
  [1612,"Clean water pour glass first sip relief",12,["drink", "slow", "close", "visual", "payoff"]],
  [1613,"Animal rescue kennel to home transition",9,["animal", "medium", "medium", "visual", "payoff"]],
  [1614,"Disaster relief aerial damage context",19,["space", "slow", "wide", "visual", "opener"]],
  [1615,"Donor wall name plaque gratitude detail",6,["brand", "slow", "close", "visual", "closer"]],
  [1616,"Impact statistics infographic build overlay",8,["brand", "medium", "close", "visual", "rhythm"]],
  [1617,"Community garden planting together hands",14,["people", "slow", "close", "visual", "rhythm"]],
  [1618,"Quilt square assembly patchwork metaphor",25,["process", "slow", "close", "visual", "texture"]],
  [1619,"Ribbon pinning advocacy symbol close-up",14,["brand", "slow", "macro", "visual", "texture"]],
  [1620,"School supplies backpack fill donation prep",25,["product", "medium", "close", "visual", "rhythm"]],
  [1621,"Candlelight vigil flame array solemn wide",4,["people", "slow", "wide", "visual", "closer"]],
  [1622,"Testimonial interview face soft light",14,["person", "slow", "close", "visual", "texture"]],
  [1623,"Grant check presentation handshake moment",14,["people", "medium", "medium", "visual", "payoff"]],
  [1624,"Mural painting community art collaboration",25,["process", "medium", "wide", "visual", "rhythm"]],
  [1625,"Applause standing ovation event recognition",14,["people", "fast", "wide", "audio", "closer"]],
  [1626,"Care package assembly line box fill seal",25,["process", "medium", "close", "visual", "rhythm"]],
  [1627,"Sunrise hope new day symbolic establishing",4,["space", "slow", "wide", "visual", "opener"]],
  [1628,"Handprint wall community participation art",7,["people", "slow", "close", "visual", "closer"]],
  [1629,"Puppy paw pad macro texture detail",6,["animal", "slow", "macro", "tactile", "texture"]],
  [1630,"Cat slow blink trust signal close-up",14,["animal", "slow", "close", "visual", "texture"]],
  [1631,"Dog shake slow-mo water spray arc",5,["animal", "slow", "medium", "visual", "payoff"]],
  [1632,"Aquarium fish schooling pattern hypnotic",5,["animal", "slow", "medium", "visual", "rhythm"]],
  [1633,"Feather texture macro bird plumage",6,["animal", "slow", "macro", "visual", "texture"]],
  [1634,"Treat toss catch slow-mo mouth snap",5,["animal", "fast", "close", "visual", "payoff"]],
  [1635,"Grooming brush stroke fur flow reveal",25,["animal", "slow", "close", "visual", "rhythm"]],
  [1636,"Nose boop finger touch macro reaction",14,["animal", "slow", "macro", "visual", "texture"]],
  [1637,"Zoomies tracking shot chaotic energy",3,["animal", "fast", "wide", "motion", "rhythm"]],
  [1638,"Sleeping pet breathing rhythm ambient",14,["animal", "slow", "close", "audio", "texture"]],
  [1639,"Adoption meet first contact emotional",14,["animal", "slow", "close", "visual", "payoff"]],
  [1640,"Terrarium ecosystem micro world macro",22,["animal", "slow", "macro", "visual", "texture"]],
  [1641,"Horse gallop field tracking parallel run",3,["animal", "fast", "medium", "motion", "rhythm"]],
  [1642,"Vet exam stethoscope listen pet calm",14,["animal", "slow", "close", "visual", "texture"]],
  [1643,"Puppy pile cuddle stack overhead",14,["animal", "slow", "close", "visual", "closer"]],
  [1644,"Bird in flight wing spread freeze frame",5,["animal", "fast", "medium", "visual", "payoff"]],
  [1645,"Kibble pour bowl fill ASMR crunch",11,["product", "medium", "close", "audio", "rhythm"]],
  [1646,"Leash clip harness up walk prep ritual",14,["animal", "medium", "close", "visual", "opener"]],
  [1647,"Tank feeding time fish frenzy surface",5,["animal", "fast", "close", "visual", "rhythm"]],
  [1648,"Paw print stamp ink pad art process",25,["animal", "slow", "close", "visual", "texture"]],
  [1649,"Shelter kennel walk row after row depth",13,["space", "slow", "medium", "visual", "opener"]],
  [1650,"Pet costume outfit reveal funny reaction",24,["animal", "medium", "medium", "visual", "payoff"]],
  [1651,"Tongue out panting happy face portrait",14,["animal", "medium", "close", "visual", "texture"]],
  [1652,"Snake skin shed texture iridescent macro",6,["animal", "slow", "macro", "visual", "texture"]],
  [1653,"Dog agility course weave pole tracking",3,["animal", "fast", "medium", "motion", "rhythm"]],
  [1654,"Cat toy chase laser dot erratic follow",3,["animal", "fast", "close", "motion", "rhythm"]],
  [1655,"Rabbit nose twitch extreme close macro",5,["animal", "slow", "macro", "visual", "texture"]],
  [1656,"Pet door flap entry surprise home arrival",2,["animal", "fast", "medium", "visual", "payoff"]],
  [1657,"Collar tag jingle name ID detail",11,["product", "slow", "macro", "audio", "texture"]],
  [1658,"Barn animal feeding trough morning routine",25,["animal", "medium", "medium", "visual", "rhythm"]],
  [1659,"Slow-mo slam dunk rim shake impact",5,["person", "fast", "medium", "visual", "payoff"]],
  [1660,"Cleat dig turf spray kickoff launch",5,["gear", "fast", "close", "visual", "opener"]],
  [1661,"Scoreboard flip number change tension",1,["brand", "fast", "close", "visual", "payoff"]],
  [1662,"Sweat drip mid-play intensity macro",6,["person", "slow", "macro", "visual", "texture"]],
  [1663,"Ball spin rotation seam detail slow-mo",5,["gear", "slow", "macro", "motion", "texture"]],
  [1664,"Crowd wave stadium aerial sweep",19,["people", "fast", "wide", "visual", "rhythm"]],
  [1665,"Locker room pre-game speech huddle",14,["people", "medium", "medium", "audio", "opener"]],
  [1666,"Starting blocks explosion sprint launch",5,["person", "fast", "close", "motion", "opener"]],
  [1667,"Medal podium step-up reveal celebration",2,["person", "medium", "medium", "visual", "payoff"]],
  [1668,"Ref whistle blow freeze play stoppage",11,["person", "fast", "medium", "audio", "transition"]],
  [1669,"Water bottle squeeze spray face refresh",7,["person", "medium", "close", "visual", "rhythm"]],
  [1670,"Instant replay multi-angle slow-mo breakdown",23,["person", "slow", "medium", "visual", "rhythm"]],
  [1671,"Chalk toss weightlifting cloud explosion",7,["person", "fast", "medium", "visual", "opener"]],
  [1672,"Finish line tape break chest through",5,["person", "fast", "medium", "motion", "payoff"]],
  [1673,"Helmet visor reflection intensity stare",14,["person", "slow", "close", "visual", "opener"]],
  [1674,"Pool lane splash flip turn underwater",3,["person", "fast", "close", "visual", "rhythm"]],
  [1675,"Bat crack ball connect slow-mo launch",11,["gear", "fast", "close", "audio", "payoff"]],
  [1676,"Jersey number reveal back turn name drop",2,["brand", "medium", "close", "visual", "opener"]],
  [1677,"Penalty kick goalkeeper dive stretch",5,["person", "fast", "wide", "motion", "payoff"]],
  [1678,"Training montage multi-exercise rapid cut",9,["person", "fast", "medium", "visual", "rhythm"]],
  [1679,"Trophy lift overhead confetti rain",7,["person", "slow", "medium", "visual", "payoff"]],
  [1680,"Glove lace tighten boxing prep ritual",14,["gear", "slow", "close", "visual", "opener"]],
  [1681,"Racket string vibration ball impact macro",5,["gear", "fast", "macro", "visual", "texture"]],
  [1682,"Sideline coach clipboard strategy gesture",14,["person", "medium", "medium", "visual", "rhythm"]],
  [1683,"Stadium tunnel walk entrance light reveal",2,["person", "medium", "wide", "visual", "opener"]],
  [1684,"Ice skate blade carve shave spray",5,["gear", "fast", "close", "visual", "texture"]],
  [1685,"Puck drop face-off overhead freeze",5,["gear", "fast", "close", "visual", "opener"]],
  [1686,"Gymnastics landing stick impact absorb",5,["person", "fast", "close", "motion", "payoff"]],
  [1687,"Starting pistol smoke bang silence break",11,["gear", "fast", "close", "audio", "opener"]],
  [1688,"Fan face paint application pre-game ritual",14,["person", "medium", "close", "visual", "opener"]],
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


// ─── KEYWORD ENGINE: 16 industry verticals ───
const KEYWORD_ENGINE = {
  music: {
    name: "Music & Audio", icon: "🎵",
    primary: ["band","album","song","track","concert","music","musician","singer","artist","rapper","DJ","producer","songwriter","performer","vocalist"],
    secondary: ["guitar","drums","bass","piano","studio","tour","vinyl","spotify","streaming","playlist","festival","venue","stage","microphone","recording","mixing","mastering","lyrics","melody","beat","rhythm","hip-hop","rock","pop","jazz","country","R&B","EDM","indie","metal","punk","folk","blues"],
    slang: ["gig","set","drop","feat","collab","banger","bars","flow","vibe","jam","hook","verse","chorus","mixtape","EP","LP","single","release","headliner","encore","setlist","soundcheck","backstage"],
    equipment: ["amp","pedal","mic","mixer","DAW","Ableton","Logic Pro","Pro Tools","FL Studio","synth","sampler","drum machine","turntable","controller","monitor","speaker","PA","interface","preamp","MIDI","headphones"],
    catWeights: {11:1.6,5:1.4,4:1.3,14:1.2,25:1.1,7:1.2,16:1.2}
  },
  real_estate: {
    name: "Real Estate", icon: "🏠",
    primary: ["house","home","property","listing","realtor","real estate","apartment","condo","townhouse","mortgage","housing","residence"],
    secondary: ["bedroom","bathroom","kitchen","living room","garage","backyard","patio","pool","basement","floor plan","curb appeal","staging","showing","open house","MLS","HOA","closing","inspection","renovation","remodel","neighborhood"],
    slang: ["starter home","dream home","just listed","just sold","under contract","pocket listing","walkthrough","tour","good bones","spacious","motivated seller","bidding war"],
    equipment: ["drone","wide-angle lens","gimbal","Matterport","3D tour","virtual staging","Zillow","Redfin"],
    catWeights: {13:1.7,19:1.6,3:1.5,4:1.3,2:1.3,6:1.2,20:1.2}
  },
  fitness: {
    name: "Fitness & Wellness", icon: "💪",
    primary: ["gym","workout","fitness","exercise","training","personal trainer","coach","athlete","bodybuilding","CrossFit","yoga","pilates"],
    secondary: ["weights","cardio","strength","HIIT","reps","sets","squat","deadlift","bench press","stretching","flexibility","recovery","protein","supplements","macros","muscle","endurance","marathon","boxing","MMA","cycling","swimming"],
    slang: ["PR","personal record","leg day","bro split","superset","drop set","beast mode","grind","gains","swole","meal prep","cheat day","deload","progressive overload"],
    equipment: ["dumbbell","barbell","kettlebell","resistance band","treadmill","Peloton","rowing machine","foam roller","yoga mat","Fitbit","Apple Watch","Garmin"],
    catWeights: {14:1.6,5:1.5,11:1.3,3:1.3,25:1.2,8:1.2,7:1.1}
  },
  beauty_fashion: {
    name: "Beauty & Fashion", icon: "💄",
    primary: ["makeup","beauty","skincare","fashion","clothing","style","cosmetics","designer","model","runway","boutique","apparel"],
    secondary: ["lipstick","foundation","mascara","eyeshadow","blush","moisturizer","serum","hair","hairstyle","nail polish","perfume","fragrance","dress","shoes","heels","sneakers","handbag","jewelry","sunglasses"],
    slang: ["GRWM","get ready with me","haul","unboxing","swatch","dupe","holy grail","flat lay","OOTD","outfit of the day","slay","serving","beat","clean girl","quiet luxury","streetwear","fit check"],
    equipment: ["ring light","beauty blender","brush set","palette","curling iron","flat iron","sewing machine","steamer","Sephora","Ulta","Dyson Airwrap"],
    catWeights: {12:1.6,6:1.5,10:1.4,14:1.3,2:1.3,24:1.3,4:1.2,5:1.1}
  },
  automotive: {
    name: "Automotive", icon: "🚗",
    primary: ["car","vehicle","auto","automotive","truck","SUV","sedan","coupe","motorcycle","dealership","mechanic","detailing"],
    secondary: ["engine","horsepower","torque","turbo","exhaust","suspension","brakes","tires","wheels","paint","wrap","ceramic coating","interior","drift","racing","track day","EV","electric vehicle","Tesla","BMW","Mercedes","Porsche","Ferrari","Ford"],
    slang: ["whip","ride","build","mod","tuned","bolt-on","stock","aftermarket","lowered","slammed","boosted","sleeper","daily driver","project car","burnout","launch control"],
    equipment: ["OBD2","jack","torque wrench","buffer","polisher","clay bar","foam cannon","pressure washer","dyno","GoPro","dashcam"],
    catWeights: {5:1.5,11:1.4,6:1.4,12:1.3,25:1.3,3:1.3,2:1.2,7:1.2}
  },
  construction: {
    name: "Construction & Trades", icon: "🔨",
    primary: ["construction","building","contractor","builder","trades","renovation","remodel","plumbing","electrical","HVAC","roofing","framing"],
    secondary: ["foundation","concrete","drywall","insulation","flooring","tile","hardwood","cabinet","countertop","paint","siding","brick","welding","steel","lumber","demolition","permit","inspection","blueprint","subcontractor"],
    slang: ["punch list","change order","rough-in","trim-out","custom build","gut job","load bearing","DIY","measure twice cut once"],
    equipment: ["hammer","nail gun","circular saw","miter saw","drill","impact driver","level","laser level","tape measure","grinder","excavator","Bobcat","Dewalt","Milwaukee","Makita"],
    catWeights: {25:1.6,5:1.5,13:1.4,6:1.3,19:1.3,7:1.3,11:1.2,22:1.2,2:1.1}
  },
  medical: {
    name: "Medical & Healthcare", icon: "🏥",
    primary: ["doctor","hospital","clinic","medical","healthcare","health","patient","nurse","physician","surgeon","dentist","therapy","practice","wellness"],
    secondary: ["diagnosis","treatment","prescription","surgery","procedure","appointment","specialist","cardiology","dermatology","pediatric","emergency","physical therapy","pharmacy","imaging","X-ray","MRI","telehealth"],
    slang: ["scrubs","rounds","on call","stat","triage","intake","discharge","follow-up","referral","bedside manner"],
    equipment: ["stethoscope","blood pressure cuff","otoscope","thermometer","pulse oximeter","EKG","defibrillator","ventilator","IV","surgical table","PPE","Epic","Cerner","EHR"],
    catWeights: {14:1.6,22:1.5,25:1.3,13:1.2,8:1.2,3:1.1,23:1.1,4:1.1}
  },
  legal: {
    name: "Legal & Law", icon: "⚖️",
    primary: ["lawyer","attorney","law firm","legal","court","litigation","counsel","paralegal","judge","trial","lawsuit","practice"],
    secondary: ["contract","deposition","testimony","plaintiff","defendant","verdict","settlement","personal injury","estate planning","corporate law","intellectual property","patent","trademark","bankruptcy","employment law"],
    slang: ["retainer","billable hours","pro bono","brief","motion","filing","discovery","objection","sustained","sidebar","precedent","due diligence","contingency","class action"],
    equipment: ["gavel","briefcase","legal pad","LexisNexis","Westlaw","DocuSign","court reporter","notary"],
    catWeights: {14:1.5,13:1.4,1:1.3,9:1.3,6:1.2,3:1.2,4:1.1,18:1.1}
  },
  agriculture: {
    name: "Agriculture & Farming", icon: "🌾",
    primary: ["farm","farming","agriculture","ranch","ranching","crop","livestock","harvest","farmer","grower","orchard","vineyard"],
    secondary: ["tractor","combine","planting","irrigation","fertilizer","organic","soil","field","pasture","barn","silo","grain","wheat","corn","cattle","dairy","beef","poultry","hay","crop rotation","farmers market"],
    slang: ["bumper crop","cash crop","homestead","sustainable","regenerative","u-pick","calving season","free-range","grass-fed","heirloom","heritage breed"],
    equipment: ["tractor","John Deere","Case IH","Kubota","combine harvester","planter","sprayer","baler","milking machine","electric fence","GPS guidance","drone","soil probe"],
    catWeights: {19:1.7,5:1.5,25:1.4,12:1.3,6:1.3,4:1.2,13:1.2,22:1.1,14:1.1}
  },
  tech: {
    name: "Tech & Software", icon: "💻",
    primary: ["software","app","SaaS","startup","tech","technology","developer","coding","programming","platform","cloud","AI","artificial intelligence"],
    secondary: ["website","web app","mobile app","API","backend","frontend","database","server","DevOps","agile","product","feature","launch","beta","MVP","UI","UX","React","Python","JavaScript","AWS","Docker","machine learning","data science","analytics","dashboard"],
    slang: ["ship it","deploy","push to prod","hotfix","bug","refactor","tech debt","scalable","disrupt","pivot","iterate","growth hack","product-market fit","unicorn","bootstrap","open source","hackathon","standup","demo day","pitch deck"],
    equipment: ["laptop","MacBook","monitor","mechanical keyboard","webcam","standing desk","server rack","GitHub","VS Code","Figma","Notion","Jira","Slack","Vercel","Stripe"],
    catWeights: {15:1.7,8:1.4,3:1.2,2:1.3,24:1.3,1:1.2,5:1.1,21:1.1}
  },
  education: {
    name: "Education", icon: "🎓",
    primary: ["school","university","college","education","teacher","professor","student","classroom","tutor","learning","course","curriculum","academy"],
    secondary: ["lesson","lecture","seminar","workshop","library","textbook","exam","grade","degree","diploma","scholarship","campus","STEM","kindergarten","elementary","high school","graduate","masters","PhD","online learning"],
    slang: ["back to school","finals week","study group","cram","office hours","dean's list","commencement","alumni","field trip"],
    equipment: ["whiteboard","smartboard","projector","Chromebook","iPad","Google Classroom","Canvas","Kahoot","microscope","calculator"],
    catWeights: {14:1.5,13:1.3,25:1.3,1:1.3,7:1.2,9:1.2,8:1.2,22:1.1,19:1.1}
  },
  retail: {
    name: "Retail & E-Commerce", icon: "🛍️",
    primary: ["store","shop","retail","e-commerce","ecommerce","online store","shopping","merchandise","product","brand","inventory","wholesale"],
    secondary: ["sale","discount","promotion","coupon","checkout","cart","SKU","POS","fulfillment","warehouse","supply chain","visual merchandising","display","window display","signage"],
    slang: ["haul","unboxing","try-on","must-have","bestseller","new arrival","restock","sold out","limited edition","drop","launch","flash sale","BOGO","Black Friday","shop small","link in bio"],
    equipment: ["POS system","barcode scanner","label printer","Shopify","WooCommerce","Klaviyo","Mailchimp"],
    catWeights: {12:1.5,2:1.4,24:1.4,6:1.3,1:1.3,8:1.3,3:1.2,4:1.2,20:1.1,18:1.1}
  },
  wedding: {
    name: "Wedding & Events", icon: "💒",
    primary: ["wedding","bride","groom","bridal","engagement","ceremony","reception","event","party","celebration","planner","coordinator"],
    secondary: ["venue","chapel","altar","aisle","vows","ring","bouquet","flowers","florist","centerpiece","invitation","RSVP","bridesmaid","groomsman","DJ","caterer","cake","first dance","honeymoon","rehearsal dinner","bachelorette"],
    slang: ["I do","said yes","engaged","bride tribe","elopement","micro wedding","destination wedding","golden hour","first look","getting ready","something blue"],
    equipment: ["arch","arbor","guest book","cake topper","sparklers","photo booth","backdrop","string lights","fairy lights","seating chart"],
    catWeights: {4:1.6,14:1.5,7:1.4,12:1.3,5:1.3,17:1.4,3:1.3,10:1.3,2:1.2,19:1.1,23:1.1}
  },
  nonprofit: {
    name: "Nonprofit & Social Impact", icon: "💚",
    primary: ["nonprofit","non-profit","charity","foundation","NGO","mission","cause","donation","fundraising","volunteer","advocacy","501c3"],
    secondary: ["donor","grant","impact","community","outreach","awareness","campaign","program","service","aid","relief","empowerment","equity","inclusion","social justice","conservation","sustainability","mental health"],
    slang: ["give back","pay it forward","making a difference","grassroots","boots on the ground","underserved","stakeholder","annual fund","capital campaign","giving Tuesday","donor retention"],
    equipment: ["donation box","silent auction","gala","phone bank","annual report","impact report","Salesforce","Bloomerang"],
    catWeights: {14:1.6,9:1.5,8:1.3,1:1.3,4:1.2,3:1.2,17:1.2,19:1.1,23:1.1}
  },
  pet: {
    name: "Pet & Animal", icon: "🐾",
    primary: ["pet","dog","cat","puppy","kitten","animal","rescue","shelter","veterinary","vet","groomer","grooming","breeder"],
    secondary: ["breed","adoption","foster","training","obedience","agility","treat","kibble","flea","tick","paw","fur","coat","fish","bird","rabbit","reptile","horse"],
    slang: ["good boy","pupper","doggo","floof","zoomies","sploot","blep","boop","tippy taps","toe beans","loaf","adopt don't shop","fur baby","gotcha day","forever home","foster fail"],
    equipment: ["leash","collar","harness","crate","kennel","bed","food bowl","litter box","cat tree","scratching post","toys","brush","nail clipper","Chewy","Petco","BarkBox","Rover"],
    catWeights: {14:1.6,5:1.4,6:1.3,3:1.3,24:1.3,12:1.2,11:1.1,25:1.1,22:1.1}
  },
  sports: {
    name: "Sports & Athletics", icon: "🏆",
    primary: ["sports","athlete","team","game","match","tournament","championship","league","coach","player","competition","season"],
    secondary: ["football","basketball","baseball","soccer","hockey","tennis","golf","volleyball","wrestling","boxing","MMA","UFC","track and field","swimming","gymnastics","Olympics","Super Bowl","NBA","NFL","MLB","NCAA","offense","defense","penalty","goal","touchdown"],
    slang: ["W","L","dub","clutch","MVP","GOAT","beast","baller","underdog","comeback","buzzer beater","walk-off","Hail Mary","highlight reel","ankle breaker","hat trick","shutout","triple double","film room"],
    equipment: ["ball","bat","glove","helmet","pads","cleats","racket","club","stick","puck","net","hoop","scoreboard","GoPro","Hudl","Nike","Adidas","Under Armour"],
    catWeights: {5:1.6,23:1.5,11:1.4,3:1.3,14:1.3,7:1.2,19:1.2,8:1.2,1:1.1,2:1.1}
  },
  hospitality: {
    name: "Hospitality & Food", icon: "🍽️",
    primary: ["restaurant","dining","bar","lounge","hotel","resort","cafe","coffee","brewery","distillery","catering","chef","menu","cocktail","cuisine"],
    secondary: ["kitchen","server","sous chef","sommelier","bartender","mixologist","appetizer","entree","dessert","wine","beer","spirits","brunch","dinner service","fine dining","casual dining","happy hour","room service","concierge","spa","lobby"],
    slang: ["behind","heard","fire","86","on the fly","in the weeds","covers","turn","comp","walk-in","two-top","four-top","tasting menu","farm to table","craft cocktail","small batch","artisan"],
    equipment: ["mandoline","immersion circulator","sous vide","plancha","combi oven","salamander","speed rack","jigger","muddler","shaker","strainer","POS","Toast","Square","Resy","OpenTable"],
    catWeights: {12:1.8,7:1.5,9:1.4,14:1.3,11:1.2,4:1.3,6:1.2,25:1.2}
  },
};

const PERSONALITIES = [
  { id: "luxury", name: "Luxury / Premium", tags: ["slow","macro","visual","payoff"], catBoost: { 4: 1.3, 10: 1.3, 12: 1.2 } },
  { id: "casual", name: "Casual / Approachable", tags: ["medium","close","visual","rhythm"], catBoost: { 9: 1.3, 14: 1.3, 24: 1.2 } },
  { id: "energetic", name: "Energetic / Bold", tags: ["fast","medium","motion","rhythm"], catBoost: { 5: 1.3, 11: 1.3, 2: 1.2 } },
  { id: "intimate", name: "Intimate / Cozy", tags: ["slow","close","visual","texture"], catBoost: { 4: 1.4, 6: 1.3, 10: 1.3 } },
  { id: "modern", name: "Modern / Cutting-Edge", tags: ["medium","medium","visual","rhythm"], catBoost: { 15: 1.4, 8: 1.3, 24: 1.3 } },
  { id: "rustic", name: "Rustic / Handcrafted", tags: ["slow","close","tactile","texture"], catBoost: { 6: 1.4, 16: 1.3, 7: 1.2 } },
  { id: "playful", name: "Playful / Fun", tags: ["fast","close","visual","rhythm"], catBoost: { 2: 1.3, 5: 1.2, 24: 1.4 } },
  { id: "editorial", name: "Editorial / Refined", tags: ["slow","medium","visual","opener"], catBoost: { 10: 1.4, 3: 1.3, 16: 1.2 } },
  { id: "cinematic", name: "Cinematic / Dramatic", tags: ["slow","wide","visual","opener"], catBoost: { 3: 1.4, 4: 1.3, 19: 1.2 } },
  { id: "documentary", name: "Documentary / Authentic", tags: ["medium","medium","visual","rhythm"], catBoost: { 14: 1.4, 25: 1.3, 9: 1.2 } },
];

const MOODS = [
  { id: "candlelight", name: "Candlelight Evening", icon: "🕯️", tags: ["slow","close","visual","texture"] },
  { id: "highenergy", name: "High Energy", icon: "⚡", tags: ["fast","medium","motion","rhythm"] },
  { id: "brunch", name: "Sunday Morning", icon: "🥂", tags: ["slow","wide","visual","opener"] },
  { id: "latenight", name: "Late Night", icon: "🌙", tags: ["medium","close","visual","rhythm"] },
  { id: "celebration", name: "Celebration", icon: "🎉", tags: ["fast","wide","audio","closer"] },
  { id: "craft", name: "Craft & Process", icon: "🔬", tags: ["slow","macro","visual","texture"] },
  { id: "social", name: "Social Buzz", icon: "📱", tags: ["fast","close","visual","rhythm"] },
  { id: "elegant", name: "Elegant & Refined", icon: "✨", tags: ["slow","medium","visual","payoff"] },
  { id: "epic", name: "Epic & Grand", icon: "🏔️", tags: ["slow","wide","visual","opener"] },
  { id: "raw", name: "Raw & Gritty", icon: "🎸", tags: ["fast","close","audio","rhythm"] },
];

const DURATIONS = [
  { id: "15", name: "15s", shots: 4, label: "Quick Hit" },
  { id: "30", name: "30s", shots: 7, label: "Standard Spot" },
  { id: "60", name: "60s", shots: 12, label: "Full Feature" },
  { id: "90", name: "90s", shots: 16, label: "Mini Doc" },
];

// ─── KEYWORD DETECTION ENGINE ───
function detectVerticals(text) {
  if (!text || text.trim().length === 0) return [];
  const t = text.toLowerCase();
  const results = [];
  
  for (const [verticalId, vertical] of Object.entries(KEYWORD_ENGINE)) {
    let score = 0;
    const allKeywords = [
      ...(vertical.primary || []).map(k => ({ word: k, weight: 3 })),
      ...(vertical.secondary || []).map(k => ({ word: k, weight: 2 })),
      ...(vertical.slang || []).map(k => ({ word: k, weight: 1.5 })),
      ...(vertical.equipment || []).map(k => ({ word: k, weight: 1 })),
    ];
    
    for (const { word, weight } of allKeywords) {
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp('\\b' + escaped + '\\b', 'gi');
      const matches = t.match(regex);
      if (matches) score += matches.length * weight;
    }
    
    if (score > 0) results.push({ id: verticalId, score, ...vertical });
  }
  
  return results.sort((a, b) => b.score - a.score);
}

function computeCatWeights(verticals, personalities) {
  const catScores = {};
  CATEGORIES.forEach(c => { catScores[c.id] = 1.0; });
  
  verticals.forEach((v, i) => {
    const decay = 1 / (i + 1);
    const weights = v.catWeights || {};
    for (const [catId, w] of Object.entries(weights)) {
      catScores[parseInt(catId)] = (catScores[parseInt(catId)] || 1) * (1 + (w - 1) * decay);
    }
  });
  
  (personalities || []).forEach(pId => {
    const p = PERSONALITIES.find(pp => pp.id === pId);
    if (p?.catBoost) {
      for (const [catId, w] of Object.entries(p.catBoost)) {
        catScores[parseInt(catId)] = (catScores[parseInt(catId)] || 1) * w;
      }
    }
  });
  
  return catScores;
}

function scoreStyle(style, catScores, personalities, mood) {
  const [id, name, catId, tags] = style;
  let score = catScores[catId] || 1.0;
  
  const pTags = (personalities || []).flatMap(pId => {
    const p = PERSONALITIES.find(pp => pp.id === pId);
    return p ? p.tags : [];
  });
  if (pTags.length > 0) {
    const overlap = tags.filter(t => pTags.includes(t)).length;
    score *= 1 + overlap * 0.15;
  }
  
  if (mood) {
    const m = MOODS.find(mm => mm.id === mood);
    if (m) {
      const overlap = tags.filter(t => m.tags.includes(t)).length;
      score *= 1 + overlap * 0.2;
    }
  }
  
  return score;
}

function getMatchedStyles(verticals, personalities, mood) {
  const catScores = computeCatWeights(verticals, personalities);
  return STYLES.map(s => {
    const [id, name, catId, tags] = s;
    return { id, name, catId, tags, score: scoreStyle(s, catScores, personalities, mood) };
  }).sort((a, b) => b.score - a.score);
}

const BEATS = {
  open: { role: "opener", icon: "🎬", name: "Opener" },
  rhythm: { role: "rhythm", icon: "🎵", name: "Rhythm" },
  texture: { role: "texture", icon: "🧱", name: "Texture" },
  payoff: { role: "payoff", icon: "💥", name: "Payoff" },
  transition: { role: "transition", icon: "🔀", name: "Transition" },
  closer: { role: "closer", icon: "🎬", name: "Closer" },
};
const BEAT_SEQ = {
  4: ["open","rhythm","payoff","closer"],
  7: ["open","rhythm","texture","rhythm","payoff","transition","closer"],
  12: ["open","rhythm","texture","transition","rhythm","payoff","rhythm","texture","transition","rhythm","payoff","closer"],
  16: ["open","rhythm","texture","transition","rhythm","payoff","rhythm","texture","rhythm","transition","rhythm","payoff","texture","rhythm","payoff","closer"],
};

function generateStoryboard(verticals, personalities, mood, shotCount) {
  const catScores = computeCatWeights(verticals, personalities);
  const seq = BEAT_SEQ[shotCount] || BEAT_SEQ[7];
  const used = new Set();
  return seq.map(beatKey => {
    const beat = BEATS[beatKey];
    const scored = STYLES.map(s => {
      const base = scoreStyle(s, catScores, personalities, mood);
      const roleMatch = s[3][4] === beat.role ? 1.5 : 1;
      return { id: s[0], name: s[1], catId: s[2], tags: s[3], score: base * roleMatch, beatName: beat.name, beatIcon: beat.icon };
    }).filter(s => !used.has(s.id)).sort((a, b) => b.score - a.score);
    const pool = scored.slice(0, 10);
    const totalW = pool.reduce((s, p) => s + p.score, 0);
    let r = Math.random() * totalW, pick = pool[0];
    for (const p of pool) { r -= p.score; if (r <= 0) { pick = p; break; } }
    if (pick) used.add(pick.id);
    return pick;
  }).filter(Boolean);
}

function hexToHSL(hex) {
  let r = parseInt(hex.slice(1,3),16)/255, g = parseInt(hex.slice(3,5),16)/255, b = parseInt(hex.slice(5,7),16)/255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h=0, s=0, l=(max+min)/2;
  if (max !== min) {
    const d=max-min; s=l>0.5?d/(2-max-min):d/(max+min);
    if (max===r) h=((g-b)/d+(g<b?6:0))/6;
    else if (max===g) h=((b-r)/d+2)/6;
    else h=((r-g)/d+4)/6;
  }
  return { h: Math.round(h*360), s: Math.round(s*100), l: Math.round(l*100) };
}

// ─── MAIN APP COMPONENT ───
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [prompt, setPrompt] = useState("");
  const [verticals, setVerticals] = useState([]);
  const [personalities, setPersonalities] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [dashMode, setDashMode] = useState("browse");
  const [mood, setMood] = useState(null);
  const [duration, setDuration] = useState(null);
  const [storyboard, setStoryboard] = useState(null);
  const [shotList, setShotList] = useState([]);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState(null);
  const [browseLimit, setBrowseLimit] = useState(50);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showExport, setShowExport] = useState(false);
  const [copyMsg, setCopyMsg] = useState("");

  const ac = "#e94560";
  const acH = hexToHSL(ac);

  const detectedVerticals = useMemo(() => detectVerticals(prompt), [prompt]);

  const activeVerticals = useMemo(() => {
    if (verticals.length > 0) return verticals.map(id => {
      const v = KEYWORD_ENGINE[id];
      return v ? { id, ...v, score: 10 } : null;
    }).filter(Boolean);
    return detectedVerticals.slice(0, 3);
  }, [verticals, detectedVerticals]);

  const matched = useMemo(() => getMatchedStyles(activeVerticals, personalities, mood), [activeVerticals, personalities, mood]);
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
    setStoryboard(generateStoryboard(activeVerticals, personalities, mood, DURATIONS.find(d => d.id === duration).shots));
  }, [activeVerticals, personalities, mood, duration]);

  const handleFile = useCallback(async (file) => {
    let text = "";
    if (file.type === "application/pdf") {
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
      try {
        const ab = await file.arrayBuffer();
        const pdf = await window.pdfjsLib.getDocument({ data: ab }).promise;
        for (let i = 1; i <= Math.min(pdf.numPages, 20); i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map(item => item.str).join(" ") + "\n";
        }
      } catch(e) { console.error("PDF parse error:", e); }
    } else if (file.type.startsWith("text/") || /\.(txt|md|csv|json)$/i.test(file.name)) {
      text = await new Promise(r => { const reader = new FileReader(); reader.onload = () => r(reader.result); reader.readAsText(file); });
    }
    if (text.trim()) {
      setPrompt(p => p + (p ? "\n\n" : "") + text.trim());
    }
    setUploadedFiles(prev => [...prev, file.name]);
  }, []);

  const handleFileDrop = useCallback((e) => {
    e.preventDefault(); setDragOver(false);
    const files = e.dataTransfer?.files || e.target?.files;
    if (files) Array.from(files).forEach(f => handleFile(f));
  }, [handleFile]);

  const handleFileSelect = useCallback((e) => {
    const files = e.target?.files;
    if (files) Array.from(files).forEach(f => handleFile(f));
  }, [handleFile]);

  const startProject = useCallback(() => {
    if (!projectName && prompt.length > 0) {
      const firstLine = prompt.split('\n')[0].trim().slice(0, 60);
      setProjectName(firstLine || "My Project");
    }
    setScreen("dashboard");
    setDashMode("browse");
  }, [prompt, projectName]);

  const copyToClipboard = useCallback((text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyMsg(label || "Copied!");
      setTimeout(() => setCopyMsg(""), 2000);
    });
  }, []);

  const chip = (active) => ({
    display: "inline-flex", alignItems: "center", gap: "0.4rem",
    padding: "0.5rem 0.9rem", borderRadius: "2rem",
    border: active ? `2px solid ${ac}` : "1px solid #2a2a2a",
    background: active ? `${ac}15` : "rgba(255,255,255,0.02)",
    color: active ? ac : "#999", cursor: "pointer", transition: "all 0.15s",
    fontSize: "0.82rem", fontFamily: "inherit",
  });

  // ─── LANDING ───
  if (screen === "landing") return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #07070a 0%, #0d0d14 40%, #141422 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", color: "#e0e0e0", padding: "2rem" }}>
      <div style={{ textAlign: "center", maxWidth: 680, width: "100%" }}>
        <div style={{ fontSize: "2.8rem", fontWeight: 700, letterSpacing: "0.06em", color: "#fff", marginBottom: "0.15rem" }}>MISE EN SHOT</div>
        <div style={{ fontSize: "0.8rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#555", marginBottom: "2rem" }}>Universal Shot List Generator</div>
        <div style={{ width: 50, height: 2, background: `linear-gradient(90deg, transparent, ${ac}, transparent)`, margin: "0 auto 2rem" }} />
        <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "#777", marginBottom: "2rem", maxWidth: 500, margin: "0 auto 2rem" }}>
          Describe your project. Get a cinematic shot list tailored to your industry.
          <br/><span style={{ color: "#555", fontSize: "0.85rem" }}>1,688 styles · 25 categories · 16 verticals — 100% client-side.</span>
        </p>

        <div style={{ textAlign: "left", marginBottom: "1.25rem" }}>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder={"Describe your brand, project, or shoot concept...\n\nExamples:\n• \"Craft brewery in Portland — taproom + outdoor patio\"\n• \"Luxury real estate listing, 4-bed modern home with pool\"\n• \"Indie rock band music video for debut single\"\n• \"Vineyard estate wedding, golden hour ceremony\""}
            style={{
              width: "100%", minHeight: 130, padding: "1rem 1.15rem",
              background: "rgba(255,255,255,0.03)", border: "1px solid #252525",
              borderRadius: "0.6rem", color: "#ddd", fontSize: "0.9rem",
              fontFamily: "inherit", outline: "none", resize: "vertical", lineHeight: 1.6,
              boxSizing: "border-box",
            }}
            onFocus={e => e.target.style.borderColor = "#444"}
            onBlur={e => e.target.style.borderColor = "#252525"}
          />
        </div>

        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleFileDrop}
          onClick={() => document.getElementById("fileInput")?.click()}
          style={{
            border: dragOver ? `1px solid ${ac}` : "1px dashed #2a2a2a",
            borderRadius: "0.6rem", padding: "1rem", cursor: "pointer",
            background: dragOver ? `${ac}06` : "rgba(255,255,255,0.015)",
            marginBottom: "1rem", transition: "all 0.15s",
          }}
        >
          <span style={{ fontSize: "0.8rem", color: dragOver ? ac : "#555" }}>
            📄 Drop brand docs here — PDF, text, markdown
          </span>
          <input id="fileInput" type="file" accept=".pdf,.txt,.md,.csv,.doc,.docx" onChange={handleFileSelect} style={{ display: "none" }} multiple />
        </div>

        {uploadedFiles.length > 0 && (
          <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginBottom: "1rem", justifyContent: "center" }}>
            {uploadedFiles.map((f, i) => <span key={i} style={{ padding: "0.25rem 0.6rem", background: `${ac}12`, border: `1px solid ${ac}28`, borderRadius: "1rem", fontSize: "0.7rem", color: ac }}>📄 {f}</span>)}
          </div>
        )}

        {detectedVerticals.length > 0 && (
          <div style={{ marginBottom: "1.25rem", padding: "0.85rem", background: "rgba(255,255,255,0.02)", border: "1px solid #1e1e1e", borderRadius: "0.6rem", textAlign: "left" }}>
            <div style={{ fontSize: "0.65rem", color: "#444", letterSpacing: "0.12em", marginBottom: "0.4rem" }}>DETECTED INDUSTRIES</div>
            <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
              {detectedVerticals.slice(0, 5).map(v => (
                <span key={v.id} style={{ padding: "0.3rem 0.65rem", background: `${ac}10`, border: `1px solid ${ac}28`, borderRadius: "1rem", fontSize: "0.75rem", color: ac }}>
                  {v.icon} {v.name} <span style={{ color: "#555", fontSize: "0.65rem" }}>({Math.round(v.score)})</span>
                </span>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginBottom: "1.25rem", textAlign: "left" }}>
          <div style={{ fontSize: "0.65rem", color: "#444", letterSpacing: "0.12em", marginBottom: "0.4rem" }}>VIBE <span style={{ color: "#333" }}>(optional)</span></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {PERSONALITIES.map(p => (
              <div key={p.id} onClick={() => setPersonalities(prev => prev.includes(p.id) ? prev.filter(x => x !== p.id) : [...prev, p.id].slice(0, 3))} style={chip(personalities.includes(p.id))}>
                {p.name}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "1.75rem", textAlign: "left" }}>
          <input
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            placeholder="Project name (optional)"
            style={{
              width: "100%", padding: "0.65rem 1rem",
              background: "rgba(255,255,255,0.03)", border: "1px solid #252525",
              borderRadius: "0.4rem", color: "#ddd", fontSize: "0.85rem",
              fontFamily: "inherit", outline: "none", boxSizing: "border-box",
            }}
          />
        </div>

        <button
          onClick={startProject}
          disabled={!prompt.trim() && detectedVerticals.length === 0}
          style={{
            background: (prompt.trim() || detectedVerticals.length > 0) ? ac : "#222",
            border: "none", color: (prompt.trim() || detectedVerticals.length > 0) ? "#fff" : "#555",
            padding: "0.9rem 3rem", fontSize: "0.85rem", letterSpacing: "0.15em",
            textTransform: "uppercase", cursor: (prompt.trim() || detectedVerticals.length > 0) ? "pointer" : "default",
            fontFamily: "inherit", borderRadius: "0.4rem", transition: "all 0.2s", width: "100%", maxWidth: 380,
          }}
        >
          Generate Shot List →
        </button>

        <p style={{ fontSize: "0.7rem", color: "#333", marginTop: "1.25rem" }}>
          No API calls · No backend · All processing happens in your browser
        </p>
      </div>
    </div>
  );

  // ─── TREATMENT EXPORT ───
  if (showExport) {
    const treatmentText = `${projectName || "Untitled Project"}\n${"═".repeat(50)}\n\nSHOT LIST — ${shotList.length} shots\nGenerated by Mise en Shot\n${"─".repeat(50)}\n\n` +
      shotList.map((s, i) => {
        const cat = CATEGORIES.find(c => c.id === s.catId);
        return `${String(i+1).padStart(2, "0")}. ${s.name}\n    Category: ${cat?.name || "—"}\n    Tags: ${s.tags.join(" · ")}\n    ${s.note ? `Note: ${s.note}\n` : ""}`;
      }).join("\n") +
      `\n${"─".repeat(50)}\nVerticals: ${activeVerticals.map(v => v.name).join(", ") || "General"}\nVibes: ${personalities.map(p => PERSONALITIES.find(pp => pp.id === p)?.name).filter(Boolean).join(", ") || "—"}\n${mood ? `Mood: ${MOODS.find(m => m.id === mood)?.name || ""}` : ""}\n`;

    return (
      <div style={{ minHeight: "100vh", background: "#07070a", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", color: "#e0e0e0", padding: "2rem" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <h2 style={{ fontWeight: 600, color: "#fff", fontSize: "1.2rem", margin: 0 }}>📄 Treatment Export</h2>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              <button onClick={() => copyToClipboard(treatmentText, "Copied!")} style={{ padding: "0.4rem 0.85rem", background: `${ac}12`, border: `1px solid ${ac}33`, color: ac, cursor: "pointer", fontFamily: "inherit", borderRadius: "0.25rem", fontSize: "0.8rem" }}>📋 Copy</button>
              <button onClick={() => { const blob = new Blob([treatmentText], {type: "text/plain"}); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `${(projectName || "mise-en-shot").replace(/\s+/g, "-").toLowerCase()}-shotlist.txt`; a.click(); }} style={{ padding: "0.4rem 0.85rem", background: ac, border: "none", color: "#fff", cursor: "pointer", fontFamily: "inherit", borderRadius: "0.25rem", fontSize: "0.8rem" }}>⬇ Download</button>
              <button onClick={() => setShowExport(false)} style={{ padding: "0.4rem 0.85rem", background: "transparent", border: "1px solid #252525", color: "#666", cursor: "pointer", fontFamily: "inherit", borderRadius: "0.25rem", fontSize: "0.8rem" }}>← Back</button>
            </div>
          </div>
          {copyMsg && <div style={{ padding: "0.4rem 0.85rem", background: `${ac}12`, border: `1px solid ${ac}28`, borderRadius: "0.25rem", color: ac, fontSize: "0.8rem", marginBottom: "0.75rem", textAlign: "center" }}>✓ {copyMsg}</div>}
          <div style={{ background: "#0c0c10", border: "1px solid #1a1a1a", borderRadius: "0.6rem", padding: "2rem", lineHeight: 1.8 }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}>{projectName || "Untitled Project"}</div>
              <div style={{ width: 36, height: 2, background: ac, margin: "0.6rem auto" }} />
              <div style={{ fontSize: "0.75rem", color: "#555" }}>Shot List · {shotList.length} shots · Mise en Shot</div>
              {activeVerticals.length > 0 && <div style={{ fontSize: "0.7rem", color: "#444", marginTop: "0.2rem" }}>{activeVerticals.map(v => v.name).join(" · ")}</div>}
            </div>
            {shotList.map((shot, i) => {
              const cat = CATEGORIES.find(c => c.id === shot.catId);
              return (
                <div key={i} style={{ display: "flex", gap: "0.85rem", padding: "0.6rem 0", borderBottom: i < shotList.length - 1 ? "1px solid #151515" : "none" }}>
                  <div style={{ width: 30, textAlign: "right", color: ac, fontWeight: 600, fontSize: "0.85rem", flexShrink: 0 }}>{String(i+1).padStart(2, "0")}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.88rem", color: "#ccc", marginBottom: "0.15rem" }}>{shot.name}</div>
                    <div style={{ fontSize: "0.7rem", color: "#444" }}>{cat?.icon} {cat?.name} · {shot.tags.join(" · ")}{shot.note ? ` · ${shot.note}` : ""}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ─── DASHBOARD ───
  const nav = [
    { id: "browse", n: "Browse", i: "🔍" },
    { id: "storyboard", n: "Storyboard", i: "🎬" },
    { id: "shotlist", n: `Shot List (${shotList.length})`, i: "📋" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #07070a 0%, #0d0d14 40%, #141422 100%)", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", color: "#e0e0e0" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.6rem 1.25rem", borderBottom: "1px solid #151515", background: "rgba(7,7,10,0.8)", backdropFilter: "blur(10px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff", letterSpacing: "0.04em", cursor: "pointer" }} onClick={() => setScreen("landing")}>MISE EN SHOT</span>
          {projectName && <span style={{ fontSize: "0.75rem", color: "#555" }}>— {projectName}</span>}
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {activeVerticals.slice(0, 2).map(v => <span key={v.id} style={{ fontSize: "0.65rem", color: "#444", background: "rgba(255,255,255,0.02)", padding: "0.15rem 0.4rem", borderRadius: "0.75rem", border: "1px solid #1a1a1a" }}>{v.icon} {v.name}</span>)}
          <span style={{ fontSize: "0.7rem", color: "#444" }}>1,688 styles</span>
        </div>
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid #151515", background: "rgba(7,7,10,0.5)" }}>
        {nav.map(n => <button key={n.id} onClick={() => { setDashMode(n.id); if (n.id !== "storyboard") setStoryboard(null); }} style={{ flex: 1, padding: "0.65rem", background: dashMode === n.id ? "rgba(255,255,255,0.03)" : "transparent", border: "none", borderBottom: dashMode === n.id ? `2px solid ${ac}` : "2px solid transparent", color: dashMode === n.id ? "#ddd" : "#555", cursor: "pointer", fontSize: "0.78rem", fontFamily: "inherit" }}>{n.i} {n.n}</button>)}
      </div>

      <div style={{ padding: "1.25rem", maxWidth: 920, margin: "0 auto" }}>
        {dashMode === "browse" && <div>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
            <input style={{ flex: 1, minWidth: 200, padding: "0.6rem 0.85rem", background: "rgba(255,255,255,0.03)", border: "1px solid #1e1e1e", borderRadius: "0.4rem", color: "#ddd", fontSize: "0.85rem", fontFamily: "inherit", outline: "none" }}
              placeholder="Search 1,688 styles..." value={search} onChange={e => { setSearch(e.target.value); setBrowseLimit(50); }} />
            <select value={catFilter || ""} onChange={e => { setCatFilter(e.target.value ? parseInt(e.target.value) : null); setBrowseLimit(50); }}
              style={{ padding: "0.6rem", background: "rgba(255,255,255,0.03)", border: "1px solid #1e1e1e", borderRadius: "0.4rem", color: "#ddd", fontFamily: "inherit" }}>
              <option value="">All Categories</option>
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
          </div>
          <div style={{ display: "flex", gap: "0.3rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.65rem", color: "#444", alignSelf: "center", marginRight: "0.25rem" }}>MOOD:</span>
            <div onClick={() => setMood(null)} style={{ padding: "0.3rem 0.55rem", borderRadius: "1rem", fontSize: "0.72rem", cursor: "pointer", border: !mood ? `1px solid ${ac}44` : "1px solid #1a1a1a", color: !mood ? ac : "#555", background: !mood ? `${ac}12` : "transparent" }}>All</div>
            {MOODS.map(m => <div key={m.id} onClick={() => setMood(mood === m.id ? null : m.id)} style={{ padding: "0.3rem 0.55rem", borderRadius: "1rem", fontSize: "0.72rem", cursor: "pointer", border: mood === m.id ? `1px solid ${ac}44` : "1px solid #1a1a1a", color: mood === m.id ? ac : "#555", background: mood === m.id ? `${ac}12` : "transparent" }}>{m.icon} {m.name}</div>)}
          </div>
          <div style={{ fontSize: "0.65rem", color: "#444", marginBottom: "0.4rem" }}>{filtered.length} styles — sorted by relevance</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {filtered.slice(0, browseLimit).map(st => {
              const cat = CATEGORIES.find(c => c.id === st.catId);
              const fit = Math.min(99, Math.round((st.score / 4) * 100));
              return <div key={st.id} style={{ padding: "0.55rem 0.75rem", background: "rgba(255,255,255,0.015)", border: "1px solid #111", borderRadius: "0.3rem", display: "flex", alignItems: "center", gap: "0.5rem", transition: "border-color 0.1s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#2a2a2a"} onMouseLeave={e => e.currentTarget.style.borderColor = "#111"}>
                <span style={{ fontSize: "0.55rem", color: "#2a2a2a", width: 24, textAlign: "right", flexShrink: 0 }}>#{st.id}</span>
                <span style={{ flex: 1, fontSize: "0.82rem", color: "#bbb" }}>{st.name}</span>
                <span style={{ fontSize: "0.6rem", color: "#3a3a3a", whiteSpace: "nowrap" }}>{cat?.icon} {cat?.name}</span>
                <div style={{ display: "flex", gap: "1px", flexShrink: 0 }}>
                  {st.tags.map((t,i) => <span key={i} style={{ padding: "0.08rem 0.25rem", background: "rgba(255,255,255,0.02)", borderRadius: "0.12rem", fontSize: "0.52rem", color: "#444" }}>{t}</span>)}
                </div>
                <div style={{ width: 36, height: 3, background: "#0d0d0d", borderRadius: 2, overflow: "hidden", flexShrink: 0 }}>
                  <div style={{ width: `${fit}%`, height: "100%", background: fit > 70 ? ac : fit > 40 ? "#c97a00" : "#333", borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: "0.55rem", color: fit > 70 ? ac : "#3a3a3a", width: 25, flexShrink: 0 }}>{fit}%</span>
                <button onClick={() => addShot(st)} style={{ background: "none", border: `1px solid ${ac}1a`, color: ac, padding: "0.15rem 0.4rem", borderRadius: "0.12rem", cursor: "pointer", fontSize: "0.6rem", fontFamily: "inherit", flexShrink: 0, transition: "border-color 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = ac}
                  onMouseLeave={e => e.currentTarget.style.borderColor = `${ac}1a`}>+</button>
              </div>;
            })}
          </div>
          {browseLimit < filtered.length && <button onClick={() => setBrowseLimit(l => l + 50)} style={{ width: "100%", marginTop: "0.5rem", padding: "0.55rem", background: "rgba(255,255,255,0.015)", border: "1px solid #151515", borderRadius: "0.3rem", color: "#555", cursor: "pointer", fontFamily: "inherit", fontSize: "0.78rem" }}>Load more ({filtered.length - browseLimit} remaining)</button>}
        </div>}

        {dashMode === "storyboard" && <div>
          {!storyboard ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.75rem", paddingTop: "1.5rem" }}>
            <h3 style={{ fontWeight: 500, color: "#fff", fontSize: "1.3rem" }}>Generate a Storyboard</h3>
            <div style={{ width: "100%", maxWidth: 480 }}>
              <label style={{ fontSize: "0.7rem", color: "#555", letterSpacing: "0.1em", display: "block", marginBottom: "0.4rem" }}>MOOD</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.35rem" }}>
                {MOODS.map(m => <div key={m.id} onClick={() => setMood(m.id)} style={{ padding: "0.75rem", borderRadius: "0.4rem", cursor: "pointer", border: mood === m.id ? `2px solid ${ac}` : "1px solid #1a1a1a", background: mood === m.id ? `${ac}0d` : "rgba(255,255,255,0.015)", textAlign: "center" }}>
                  <div style={{ fontSize: "1.2rem" }}>{m.icon}</div>
                  <div style={{ fontSize: "0.78rem", color: mood === m.id ? "#ddd" : "#777", marginTop: "0.15rem" }}>{m.name}</div>
                </div>)}
              </div>
            </div>
            {mood && <div style={{ width: "100%", maxWidth: 480 }}>
              <label style={{ fontSize: "0.7rem", color: "#555", letterSpacing: "0.1em", display: "block", marginBottom: "0.4rem" }}>DURATION</label>
              <div style={{ display: "flex", gap: "0.35rem" }}>
                {DURATIONS.map(d => <div key={d.id} onClick={() => setDuration(d.id)} style={{ flex: 1, padding: "0.75rem", borderRadius: "0.4rem", cursor: "pointer", border: duration === d.id ? `2px solid ${ac}` : "1px solid #1a1a1a", background: duration === d.id ? `${ac}0d` : "rgba(255,255,255,0.015)", textAlign: "center" }}>
                  <div style={{ fontSize: "1rem", fontWeight: 600, color: duration === d.id ? "#ddd" : "#777" }}>{d.name}</div>
                  <div style={{ fontSize: "0.6rem", color: "#444" }}>{d.label} · {d.shots} shots</div>
                </div>)}
              </div>
            </div>}
            {mood && duration && <button onClick={doGen} style={{ padding: "0.75rem 2.5rem", background: ac, border: "none", color: "#fff", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.15em", textTransform: "uppercase", borderRadius: "0.3rem", fontSize: "0.82rem" }}>Generate</button>}
          </div> : <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.4rem" }}>
              <div>
                <h3 style={{ fontWeight: 500, color: "#fff", fontSize: "1.1rem", margin: 0 }}>{projectName || "Storyboard"} — {MOODS.find(m => m.id === mood)?.icon} {MOODS.find(m => m.id === mood)?.name}</h3>
                <span style={{ fontSize: "0.7rem", color: "#444" }}>{DURATIONS.find(d => d.id === duration)?.name} · {storyboard.length} shots</span>
              </div>
              <div style={{ display: "flex", gap: "0.35rem" }}>
                <button onClick={() => setStoryboard(null)} style={{ padding: "0.35rem 0.75rem", background: "transparent", border: "1px solid #1e1e1e", color: "#555", cursor: "pointer", fontFamily: "inherit", borderRadius: "0.2rem", fontSize: "0.78rem" }}>← Back</button>
                <button onClick={doGen} style={{ padding: "0.35rem 0.75rem", background: "transparent", border: "1px solid #252525", color: "#777", cursor: "pointer", fontFamily: "inherit", borderRadius: "0.2rem", fontSize: "0.78rem" }}>🎲 Reroll</button>
                <button onClick={() => storyboard.forEach(s => addShot(s, s.beatName))} style={{ padding: "0.35rem 0.75rem", background: ac, border: "none", color: "#fff", cursor: "pointer", fontFamily: "inherit", borderRadius: "0.2rem", fontSize: "0.78rem" }}>→ Add All</button>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1px", marginBottom: "1rem", height: 3, borderRadius: 1, overflow: "hidden" }}>
              {storyboard.map((s, i) => <div key={i} style={{ flex: 1, background: `hsl(${(acH.h + i * 15) % 360}, ${acH.s}%, ${35 + (i%3)*8}%)` }} />)}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {storyboard.map((shot, i) => {
                const cat = CATEGORIES.find(c => c.id === shot.catId);
                return <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "center", padding: "0.6rem 0.75rem", background: "rgba(255,255,255,0.015)", border: "1px solid #111", borderRadius: "0.3rem" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${ac}12`, border: `1px solid ${ac}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", flexShrink: 0 }}>{shot.beatIcon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.82rem", color: "#bbb" }}>{shot.name}</div>
                    <div style={{ fontSize: "0.6rem", color: "#3a3a3a" }}>{shot.beatName} · {cat?.icon} {cat?.name}</div>
                  </div>
                  <div style={{ display: "flex", gap: "1px", flexWrap: "wrap" }}>
                    {shot.tags.map((t,j) => <span key={j} style={{ padding: "0.08rem 0.25rem", background: "rgba(255,255,255,0.02)", borderRadius: "0.12rem", fontSize: "0.52rem", color: "#444" }}>{t}</span>)}
                  </div>
                  <button onClick={() => addShot(shot, shot.beatName)} style={{ background: "none", border: `1px solid ${ac}1a`, color: ac, padding: "0.15rem 0.4rem", borderRadius: "0.12rem", cursor: "pointer", fontSize: "0.6rem", fontFamily: "inherit", flexShrink: 0 }}>+</button>
                </div>;
              })}
            </div>
          </div>}
        </div>}

        {dashMode === "shotlist" && <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontWeight: 500, color: "#fff", fontSize: "1.1rem", margin: 0 }}>Shot List <span style={{ color: "#444", fontSize: "0.85rem" }}>({shotList.length})</span></h3>
            <div style={{ display: "flex", gap: "0.35rem" }}>
              {shotList.length > 0 && <>
                <button onClick={() => {
                  const txt = `${projectName || "Untitled"} — Shot List\n${"=".repeat(40)}\n` + shotList.map((s,i) => `${i+1}. [${CATEGORIES.find(c => c.id === s.catId)?.name}] ${s.name}${s.note ? ` — ${s.note}` : ""}`).join("\n");
                  copyToClipboard(txt, "Copied!");
                }} style={{ padding: "0.35rem 0.75rem", background: "transparent", border: "1px solid #252525", color: "#777", cursor: "pointer", fontFamily: "inherit", borderRadius: "0.2rem", fontSize: "0.78rem" }}>📋 Copy</button>
                <button onClick={() => setShowExport(true)} style={{ padding: "0.35rem 0.75rem", background: `${ac}12`, border: `1px solid ${ac}33`, color: ac, cursor: "pointer", fontFamily: "inherit", borderRadius: "0.2rem", fontSize: "0.78rem" }}>📄 Export</button>
                <button onClick={() => setShotList([])} style={{ padding: "0.35rem 0.75rem", background: "transparent", border: "1px solid #1a1a1a", color: "#444", cursor: "pointer", fontFamily: "inherit", borderRadius: "0.2rem", fontSize: "0.78rem" }}>Clear</button>
              </>}
            </div>
          </div>
          {copyMsg && <div style={{ padding: "0.35rem 0.75rem", background: `${ac}0d`, border: `1px solid ${ac}22`, borderRadius: "0.2rem", color: ac, fontSize: "0.78rem", marginBottom: "0.6rem", textAlign: "center" }}>✓ {copyMsg}</div>}
          {shotList.length === 0 ? <div style={{ textAlign: "center", padding: "3.5rem 2rem", color: "#333" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem", opacity: 0.3 }}>📋</div>
            <p style={{ fontSize: "0.88rem", color: "#444" }}>No shots yet. Browse or generate a storyboard to start building.</p>
          </div> : <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {shotList.map((shot, i) => {
              const cat = CATEGORIES.find(c => c.id === shot.catId);
              return <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "center", padding: "0.55rem 0.75rem", background: "rgba(255,255,255,0.015)", border: "1px solid #111", borderRadius: "0.3rem" }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", background: `${ac}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", color: ac, fontWeight: 600, flexShrink: 0 }}>{i+1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.82rem", color: "#bbb" }}>{shot.name}</div>
                  <div style={{ fontSize: "0.6rem", color: "#3a3a3a" }}>{cat?.icon} {cat?.name}{shot.note ? ` · ${shot.note}` : ""}</div>
                </div>
                <button onClick={() => rmShot(i)} style={{ background: "none", border: "1px solid #151515", color: "#333", width: 20, height: 20, borderRadius: "50%", cursor: "pointer", fontSize: "0.65rem", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
              </div>;
            })}
          </div>}
        </div>}
      </div>
    </div>
  );
}
