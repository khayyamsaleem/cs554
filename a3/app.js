const express = require('express')
const app = express()
const favicon = require('serve-favicon')

app.use('/public', express.static('public'))
app.use(favicon(__dirname + '/public/favicon.ico'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index', {
        products: [
            {
                id: 'toblerone',
                name: 'Toblerone',
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Toblerone_3362.jpg/440px-Toblerone_3362.jpg',
                blurb: 'tiny chocolate pyramids',
                details: `
                    Toblerone (/ˈtoʊbləroʊn/; German: [tobləˈroːnə]) is a Swiss chocolate bar brand currently owned by US confectionery company Mondelēz International, Inc., which was formerly Kraft Foods, the company that acquired the product from former owner Jacobs Suchard in 1990. It is produced in the capital city of Switzerland, Bern, and the bear symbol of the city is still visible in the logo. Toblerone is known for its distinctive shape, which involves a series of joined triangular prisms.
                `,
            },
            {
                id: 'klerksdorp',
                name: 'Klerksdorp sphere',
                img: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Ottosdal1.jpg',
                blurb: 'wonky rocks',
                details: `
                    Klerksdorp spheres are small objects, often spherical to disc-shaped, that have been collected by miners and rockhounds from 3-billion-year-old pyrophyllite deposits mined by Wonderstone Ltd., near Ottosdal, South Africa. They have been cited by some alternative researchers and reporters in books, popular articles, and many web pages, as inexplicable out-of-place artifacts that could only have been manufactured by intelligent beings. Geologists who have studied these objects have concluded that the objects are not manufactured, but are rather the result of natural processes.
                `,
            },
            {
                id: 'parkingchair',
                name: 'Parking Chair',
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Pittsburgh_Parking_Chair.jpg/340px-Pittsburgh_Parking_Chair.jpg',
                blurb: 'a dick move',
                details: `
                    A parking chair is a chair that is used by a vehicle owner to informally mark a parking space as reserved. Other objects are also used for this purpose, including trash cans, ladders, ironing boards, and similar-sized objects. For curbside parking spaces, two or more items are normally used; for angle spaces, only one is needed.
                `,
            },
            {
                id: 'uselessmachine',
                name: 'Useless Machine',
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/UselessMachine.png/440px-UselessMachine.png',
                blurb: 'procrastination engine',
                details: `
                    A useless machine is a device which has a function but no direct purpose. It may be intended to make a philosophical point, as an amusing engineering "hack", or as an intellectual joke. Devices which have no function or which malfunction are not considered to be "useless machines".
The most well-known "useless machines" are those inspired by Marvin Minsky's design, in which the device's sole function is to switch itself off by operating its own "off" switch. More elaborate devices and novelty toys, having some obvious function or entertainment value, have been based on these simple "useless machines".
                `,
            },
            {
                id: 'iloo',
                name: 'iLoo',
                img: 'https://upload.wikimedia.org/wikipedia/en/b/bb/Msn_iloo.jpg',
                blurb: 'Microsoft\'s attempt to bring you the interwebzzz inside the portable public loo.',
                details: `
                    The iLoo (short for Internet loo) was a cancelled Microsoft project to develop a Wi-Fi Internet-enabled portable toilet. The iLoo, which was to debut at British summer festivals, was described as being a portable toilet with wireless broadband Internet, an adjustable plasma screen, a membrane wireless keyboard, a six-channel speaker system, and toilet paper embossed with popular web site addresses. The iLoo was also to have an extra screen and keyboard on the outside, and was to be guarded. It was intended as the next in a series of successful initiatives by MSN UK which sought to introduce the internet in unusual locations, including MSN Street, MSN Park Bench and MSN Deckchair.
                `,
            },
            {
                id: 'tfhat',
                name: 'Tin foil hat',
                img: 'https://upload.wikimedia.org/wikipedia/commons/8/85/ManWearingTinFoilHat.jpg',
                blurb: 'Headgear which allegedly prevents a person from having their minds read or controlled.',
                details: `
                    A tin foil hat is a hat made from one or more sheets of aluminium foil, or a piece of conventional headgear lined with foil, worn in the belief or hope that it shields the brain from threats such as electromagnetic fields, mind control, and mind reading. The notion of wearing homemade headgear for such protection has become a popular stereotype and byword for paranoia, persecutory delusions, and belief in pseudoscience and conspiracy theories.
Note that "tin foil" is a common misnomer for aluminium foil; packaging metal foil was formerly made out of tin before it was replaced with aluminium.
                `,
            },
            {
                id: 'hpb',
                name: 'Experiment',
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/1808_horse_paddle-boat.jpg/600px-1808_horse_paddle-boat.jpg',
                blurb: 'A boat with eight horse-powers. Literally.',
                details: `
                    Experiment was a horse-powered ferry boat. It was a 12-ton, three-masted boat drawing a few feet of water, about 100 feet (30 m) long by 20 feet (6.1 m) beam. Its driving mechanism was an in-water screw invented by David Grieve in 1801. The boat was constructed by David Wilkinson (some sources give his name as Varnum) in 1807 to 1810, depending on the source. It was propelled by a "goose-foot paddle," a large mechanical screw propeller in the water instead of a paddle wheel at water surface. The new technology devised by Grieve and Wilkinson was powered by eight horses on a treadmill. The technology to propel the boat upstream was originally invented by David Grieve and granted a patent February 24, 1801 in the category of "Boats to ascend rivers". The complete recorded patent was lost in the 1836 U.S. Patent Office fire. The idea of propelling vessels by a mechanical screw in the water is now referred to as Ericsson's propeller.
                `,
            },
            {
                id: 'jesusnut',
                name: 'Jesus nut',
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Jesus_nut.jpg/440px-Jesus_nut.jpg',
                blurb: 'Not what it sounds like',
                details: `
                    Jesus nut, or Jesus pin, is a slang term for the main rotor retaining nut which holds the main rotor to the mast of some helicopters, such as the UH-1 Iroquois helicopter; or more generally is any component that represents a single point of failure with catastrophic consequences.

The term Jesus nut may have been coined by American soldiers in Vietnam; the Vietnam War was the first war to feature large numbers of soldiers riding in helicopters.

If the Jesus pin were to fail in flight, the helicopter would detach from the rotor and the only thing left for the crew to do would be to "pray to Jesus." Real examples of the Jesus pin failing are few and far between. However, the pin must be checked before the flight. Some more recent helicopter systems do not have a Jesus nut.
                `,
            },
            {
                id: 'ismell',
                name: 'iSmell',
                img: 'https://upload.wikimedia.org/wikipedia/en/b/ba/ISmell.jpg',
                blurb: 'stinky',
                details: `
                    The iSmell Personal Scent Synthesizer developed by DigiScents Inc. is a small device that can be connected to a computer through a Universal serial bus (USB) port and powered using any ordinary electrical outlet. The appearance of the device is similar to that of a shark’s fin, with many holes lining the “fin” to release the various scents. Using a cartridge similar to a printer’s, it can synthesize and even create new smells by combining certain combinations of other scents. These newly created odors can be used to closely replicate common natural and manmade odors. The cartridges used also need to be swapped every so often once the scents inside are used up. Once partnered with websites and interactive media, the scents can be used either by automatically once a website is opened or activated manually. However, the product is no longer on the market and never generated substantial sales. Digiscent had plans for the iSmell to have several versions but did not progress the past the prototype stage. The company did not last long and filed for bankruptcy a short time after.
                `,
            },
            {
                id: 'koteka',
                name: 'Koteka',
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Koteka.jpg/440px-Koteka.jpg',
                blurb: 'the sheath',
                details: `
                    The koteka, horim, or penis gourd is a penis sheath traditionally worn by native male inhabitants of some (mainly highland) ethnic groups in New Guinea to cover their genitals. They are normally made from a dried-out gourd, Lagenaria siceraria, although other species, such as Nepenthes mirabilis, are also used. They are held in place by a small loop of fiber attached to the base of the koteka and placed around the scrotum. There is a secondary loop placed around the chest or abdomen and attached to the main body of the koteka. Men choose kotekas similar to ones worn by other men in their cultural group. For example, Yali men favour a long, thin koteka, which helps hold up the multiple rattan hoops worn around their waist. Men from Tiom wear a double gourd, held up with a strip of cloth, and use the space between the two gourds for carrying small items such as money and tobacco.
                `,
            },
        ]
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running http://localhost:3000')
})
