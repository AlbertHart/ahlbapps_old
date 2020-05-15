
    console.log("IN tranpose_functions.js");

    var osmd_transpose = {};
    (function() {
        this.id = 0;


        this.test = -1;
     
        this.next = function() {
            return this.id++;    
        };
     
        this.reset = function() {
            this.id = 0;     
        }
    }).apply(osmd_transpose);    
     



    osmd_transpose.back = function() {
        console.log("BACK id: %s", this.id); 
        return this.id--;    
    }

 

    osmd_transpose.back();
    osmd_transpose.back();


    // this has to mave room for offsets of -12 to 12
    osmd_transpose.line_of_fifths = [
        // 0
            "Db", "Ab", "Eb", "Bb", "F", "C", "G",
            "D", "A", "E", "B", "Gb", "Db", "Ab",      
            "Eb", "Bb", "F", "C", "G", "D", "A",

            "E", "B",
        // 23 start here
            "Gb", "Db", "Ab", "Eb", "Bb",
            "F", "C", "G", "D", "A", "E", "B",
            "F#", "C#", "G#", "D#", "A#",
        // 40
            "F", "C",
            "G", "D", "A", "E", "B", "F#", "C#",
            "G#", "D#", "A#", "F", "C", "G", "D", 
    ];

    // generate letters for each new line_)of_fifths number
    osmd_transpose.line_of_fifths_numbers = {
        "Gb": 23,
        "Db": 24,
        "Ab": 25,
        "Eb": 26, 
        "Bb": 27,
        "F": 28, "E#": 28,
        "C": 29, "B#": 29,
        "G": 30,
        "D": 31,
        "A": 32,
        "E": 33, "Fb": 33,
        "B": 34, "Cb": 34,
        "F#": 35,
        "C#": 36,
        "G#": 37,
        "D#": 38,
        "A#": 39,
    };

    // ## and bb do not work yet
    osmd_transpose.accidentals_in_key = {
        "C": {"C": "", "D": "", "E": "", "F": "", "G": "", "A": "", "B": ""},
        "F": {"C": "", "D": "", "E": "", "F": "", "G": "", "A": "", "B": "flat"},
        "Bb": {"C": "", "D": "", "E": "flat", "F": "", "G": "", "A": "", "B": "flat"},
        "Eb": {"C": "", "D": "", "E": "flat", "F": "", "G": "", "A": "flat", "B": "flat"},
        "Ab": {"C": "", "D": "flat", "E": "flat", "F": "", "G": "", "A": "flat", "B": "flat"},
        "Db": {"C": "", "D": "flat", "E": "flat", "F": "", "G": "flat", "A": "flat", "B": "flat"},
        "Gb": {"C": "", "D": "flat", "E": "flat", "F": "flat", "G": "flat", "A": "flat", "B": "flat"},
        "Cb": {"C": "flat", "D": "flat", "E": "flat", "F": "flat", "G": "flat", "A": "flat", "B": "flat"},


        "G": {"C": "", "D": "", "E": "", "F": "sharp", "G": "", "A": "", "B": ""},
        "D": {"C": "sharp", "D": "", "E": "", "F": "sharp", "G": "", "A": "", "B": ""},
        "A": {"C": "sharp", "D": "", "E": "", "F": "sharp", "G": "sharp", "A": "", "B": ""},
        "E": {"C": "sharp", "D": "sharp", "E": "", "F": "sharp", "G": "sharp", "A": "", "B": ""},
        "B": {"C": "sharp", "D": "sharp", "E": "", "F": "sharp", "G": "sharp", "A": "sharp", "B": ""},
        "F#": {"C": "sharp", "D": "", "E": "sharp", "F": "sharp", "G": "sharp", "A": "sharp", "B": ""},
        "C#": {"C": "sharp", "D": "", "E": "sharp", "F": "sharp", "G": "sharp", "A": "sharp", "B": "sharp"},
        "G#": {"C": "sharp", "D": "", "E": "sharp", "F": "##", "G": "sharp", "A": "sharp", "B": "sharp"},
        "D#": {"C": "##", "D": "sharp", "E": "sharp", "F": "##", "G": "sharp", "A": "sharp", "B": "sharp"},

    };

    osmd_transpose.note_letters_flat = ["", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
    osmd_transpose.note_letters_sharp = ["", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    osmd_transpose.sharp_flat_from_note = {
        "C": "b",
        "C#": "#",
        "Db": "b",
        "D": "#",
        "D#": "#",
        "Eb": "b",
        "E": "#",
        "E#": "#",
        "Fb": "b",
        "F": "b", 
        "F#": "#",
        "Gb": "b",
        "G": "#",
        "G#": "#",
        "Ab": "b", 
        "A": "#",
        "A#": "#",
        "B": "#",
        "B#": "#",
        "Cb": "b", 
    };

    osmd_transpose.note_numbers = {
            
        "B#" : 1,
        "C" : 1,
        "C#" : 2,
        "Db" : 2,
        "D" : 3,
        "D#" : 4,
        "Eb" : 4,
        "E" : 5,

        "Fb" : 5,
        "E#" : 6,

        "F" : 6,
        "F#" : 7,
        "Gb" : 7,
        "G" : 8,
        "G#" : 9,
        "Ab" : 9,
        "A" : 10,
        "A#" : 11,
        "Bb" : 11,
        "B" : 12,
        "Cb" : 12,
    };

        
    // when to bump the octave
    osmd_transpose.step_number = {
        "C" : 0,
        "D" : 1,
        "E" : 2,
        "F" : 3,
        "G" : 4,
        "A" : 5,
        "B" : 6,      
    };

    osmd_transpose.old_key;
    osmd_transpose.new_key;

    osmd_transpose.transpose = function(old_step, old_alter, old_octave) 
    {
        var parameters = this.parameters;
        show_output = parameters.show_output;
        if (show_output)
            console.log("transpose: %s %s %s", old_step, old_alter, old_octave)
        old_note = old_step;
        if (old_alter == 1)
            old_note += "#";
        else if (old_alter == -1)
            old_note += "b";

        // move to local variables
        var old_key = this.old_key;
        var new_key = this.new_key;
        
        
        //console.log("old_key: %s new_key: %s old_note: %s", old_key, new_key, old_note);

        old_key_number = this.note_numbers[old_key];
        new_key_number = this.note_numbers[new_key];
        var key_offset = new_key_number - old_key_number;

        up_offset = (key_offset + 12) % 12; // move up
        down_offset = (key_offset - 12) % 12; // move down

        if (parameters.transpose_direction == "up")
            key_offset = up_offset; // move up
        else if (parameters.transpose_direction == "down")
            key_offset = down_offset; // move down
        else    // closest
        {
            // get closest offset
            
            if (Math.abs(up_offset) <= Math.abs(down_offset))
                key_offset = up_offset;
        else
                key_offset = down_offset;
        }
        
        new_fifths = this.line_of_fifths_numbers[new_key] - this.line_of_fifths_numbers["C"];
        //console.log("old_key: %s new_key: %s key_offset: %s new_fifths: %s", old_key, new_key, key_offset, new_fifths);

        kpos1 = this.line_of_fifths_numbers[old_key];
        kpos2 = this.line_of_fifths_numbers[new_key];
        fifths_offset = kpos2 - kpos1;
        npos1 = this.line_of_fifths_numbers[old_note]; 
        npos2 = npos1 + fifths_offset;
        new_note = this.line_of_fifths[npos2];
        //console.log("npos1: %s npos2: %s fifths_offset: %s new_note: %s",
        //    npos1, npos2, fifths_offset, new_note);
        new_step = new_note.substr(0,1);
        new_alter = "";
        if (new_note.substr(1,1) == '#')
            new_alter = "1";
        else if (new_note.substr(1,1) == 'b')
            new_alter = "-1";

        // offset octave
        //old_note_number = this.note_numbers[old_note];
        //new_note_number = this.note_numbers[new_note];
        old_step_number = this.step_number[old_step];
        new_step_number = this.step_number[new_step];

        new_octave = Number(old_octave);    // ADH - calculate change of octave
        if (key_offset > 0 && new_step_number < old_step_number)
            new_octave += 1;
        else if (key_offset < 0 && new_step_number > old_step_number)
            new_octave -= 1;
        
        if (show_output)
            console.log(`npos1: %s npos2: %s old_octave: %s old_step: %s old_step_number: %s 
                new_step: %s new_step_number: %s new_alter: %s new_octave: %s`, 
                npos1, npos2, old_octave, old_step, old_step_number, new_step, new_step_number, new_alter, new_octave);
        transposed_note = {
            "note": new_note,
            "step": new_step,
            "alter": new_alter,
            "octave": new_octave,
        };
        return (transposed_note);
    }

    //osmd_transpose.transpose("Bb",2,3);

    // parameters used:
    // transpose_key e.g. "Bb"
    // transpose_direction - "up" or "down" (use closest if not set)
    // song_name - not currently used
    // show_output - true to show all console.logs

    osmd_transpose.transpose_xml = function(parameters, xml_string_in)
{
    this.parameters = parameters;
    console.log("transpose_xml: transpose_key: %s str lenL %s", parameters.transpose_key, xml_string_in.length);
    if (parameters.transpose_key == "None")
        return;

    show_output = this.parameters.show_output;

    var xml_string = xml_string_in;
    str_out = "";
    in_note = false;
    in_measure = false;
    if (show_output)
        console.log("xml_string length: %s", xml_string.length);
    str_in = xml_string.split("\n");
    if (show_output)
        console.log("transpose_xml lines: %s", str_in.length);

    in_pitch = false;
    in_root = false;
    in_bass = false;

    duration = 0;
    last_note_duration = 0;
    last_stem_direction = "";
    current_accidentals = {};

    measure_count = 0; // measure count
    divisions = 0;
    show_debugs = false;    // to display output for only certain measures


    for (ii = 0; ii < str_in.length; ii++)
    {
        sline = str_in[ii];
        if (show_output)
            console.log("ii: %s sline: %s", ii, sline);

        //  divisions element indicates how many divisions per quarter note are used to indicate a note's duration
        //  <divisions>256</divisions>
        if (sline.indexOf("<divisions>") >= 0)
        {
            divisions = get_xml_number(sline);
            if (show_output)
                console.log("divisions: %s", divisions);
        }

        if (sline.indexOf("<measure") >= 0)
        {
            // break grouped notes at measure
            measure_count++;
            if (show_output)
                console.log("MEASURE: %s: %s", measure_count, sline);
            //if (measure_count < 15)
            //    show_debugs = true;
            //if (measure_count > 16)
            //    show_debugs = false;
            last_note_duration = 0;
            last_stem_direction = "";
            if (this.new_key)
                {
                    // since this is an object, we need to clone it
                    current_accidentals = JSON.parse(JSON.stringify(this.accidentals_in_key[this.new_key]));
                    if (show_output)
                        console.log("new_key: %s current_accidentals[F]: %s", new_key, current_accidentals["F"]);
                }
            }


            if (sline.indexOf("</measure") >= 0)
            {
            }

            // stop here for testing
            if (sline.indexOf("xxx<work") >= 0)
            {
                console.log("STOP FOR TESTING");
                break;
            }

            // <fifths>-4</fifths>
            if (sline.indexOf("</fifths") >= 0)
            {
                fifths = get_xml_number(sline);
                if (show_output)
                    console.log("SLINE: %s fifths: %s", sline, fifths);
                line_of_fifths_c = this.line_of_fifths_numbers["C"];
                old_key_number = fifths + line_of_fifths_c;
                this.old_key = this.line_of_fifths[old_key_number];
                if (show_output)
                    console.log("fifths: %s old_key_number: %s old_key: %s", fifths, old_key_number, this.old_key);

                this.new_key = parameters.transpose_key;
                new_line_of_fifths_number = this.line_of_fifths_numbers[this.new_key] - line_of_fifths_c;
                if (show_output)
                    console.log("<fifths>%s</fifths> old_key: %s new_key: %s \n", new_line_of_fifths_number, this.old_key, this.new_key);
                str_out += `<fifths>` + new_line_of_fifths_number+ `</fifths>`;
                
                // since this is an object, we need to clone it
                current_accidentals = JSON.parse(JSON.stringify(this.accidentals_in_key[this.new_key]));
                if (show_output)
                    console.log("new_key: %s current_accidentals[F]: %s", this.new_key, current_accidentals["F"]);
                continue;
            }

            if (sline.indexOf("<note") >= 0)
            {
                in_note = true;


            } 
            if (sline.indexOf("</note") >= 0)
            {
                in_note = false;


            }

            if (in_note)
            {
                if (sline.indexOf("<duration>") >= 0)
                {
                    duration = get_xml_number(sline);
                    //console.log("duration: %s", duration);
                }
            }

            // <pitch>
            //     <step>E</step>
            //     <alter>-1</alter>
            //     <octave>4</octave>
            //     </pitch>
            if (sline.indexOf("<pitch") >= 0)
            {
                in_pitch = true;
                
                pitch_alter = "";
                pitch_step = "";
                pitch_octave = "";
                new_accidental = "";
                continue;
            }
            if (sline.indexOf("</pitch") >= 0)
            {
                transposed_note = this.transpose(pitch_step, pitch_alter, pitch_octave);

                pitch_xml = `<pitch>
                <step>` + transposed_note.step + `</step>\n`;
                snew_note = transposed_note.step;
                new_accidental = "";
                if (transposed_note.alter == 1)
                {
                    new_accidental = "sharp";
                    snew_note = snew_note + "#";
                pitch_xml += `     <alter>` + transposed_note.alter + `</alter>\n`;
                }
                else if (transposed_note.alter == -1)
                {
                    new_accidental = "flat";
                    snew_note = snew_note + "b";
                pitch_xml += `     <alter>` + transposed_note.alter + `</alter>\n`;
                }
                if (show_output)
                    console.log("snew_note: %s current_accidentals[%s]: %s", snew_note, snew_note, current_accidentals[snew_note]);
                current_accidental = current_accidentals[snew_note];
                if (show_output)
                    console.log("snew_note: %s transposed_note.alter: %s current_accidental: %s new_accidental: %s",
                        snew_note, transposed_note.alter, current_accidental,  new_accidental);

            
                if (current_accidental == new_accidental)
                {
                    accidental_out = "";     // no change from key or last note
                }
                else if (new_accidental == "")
                {
                    accidental_out = "natural";               
                }
                else 
                {
                    accidental_out = new_accidental;
                }
                if (show_debugs)
                    console.log("snew_note: %s transposed_note.alter: %s new_accidental: %s snew_note: %s accidental_out: %s",
                        snew_note, transposed_note.alter, new_accidental, snew_note, accidental_out);

                current_accidentals[snew_note] = new_accidental;


                pitch_xml += `     <octave>` + transposed_note.octave + `</octave>
                    </pitch>\n`;
                if (show_output)
                    console.log("PITCH_XML: %s", pitch_xml);
        
                str_out += pitch_xml;
                in_pitch = false;
                continue;
            }
                
            
            if (in_pitch)
            {
                if (sline.indexOf("<step") >= 0)
                {
                    pitch_step = get_xml_value(sline);
                    continue;
                }
                if (sline.indexOf("<alter") >= 0)
                {
                    pitch_alter = get_xml_number(sline);
                    continue;
                }
                if (sline.indexOf("<octave") >= 0)
                {
                    pitch_octave = get_xml_number(sline);
                    continue;
                }
            }

            // <accidental>sharp</accidental>
            // ADH - do we ever force 'natural'?
            // YES: We need to check against last accidental in this measure,
            // and the accidentals in this key
            if (sline.indexOf("<accidental>") >= 0)
            {
                if (accidental_out != "")
                {
                    if (show_debugs)
                        console.log("<accidental>%s</accidental>\n", accidental_out);
                    str_out += `<accidental>` + accidental_out + `</accidental>\n`;
                }
                continue;
                
            }

            // <stem>down</stem>
            if (sline.indexOf("<stem>") >= 0)
            {
                // if in eighth or smaller group - keep same stem
                if (duration < divisions && last_note_duration > 0 && last_note_duration < divisions)
                {
                    if (show_output)
                        console.log("USE LAST STEM DIRECTION: %s", last_stem_direction);
                    stem_direction = last_stem_direction;
                }
                else if (pitch_octave > 4)
                    stem_direction = "down";
                else if (pitch_octave < 4)
                    stem_direction = "up";
                else if (pitch_step == "B")
                    stem_direction = "down";
                else
                    stem_direction = "up";

                

                if (show_output)
                        console.log("duration: %s last_note_duration: %s last_stem_direction: %s pitch_octave: %s pitch_step: %s new stem_direction: %s",
                            duration, last_note_duration, last_stem_direction, pitch_octave, pitch_step, stem_direction );


                last_stem_direction = stem_direction;
                last_note_duration = duration;
            str_out += `<stem>` + stem_direction + `</stem>\n`;
                continue;
            }

        
                
            
            // transpose root
            // <root>
            // <root-step>A</root-step>
            // <root-alter>-1</root-alter>
            // </root>

            if (sline.indexOf("<root>") >= 0)
            {
                //console.log("START %s", sline);
                in_root = true;
                root_alter = "";
                root_step = "";
                continue;
            }
                
            
            if (sline.indexOf("</root>") >= 0)
            {
                //console.log("END %s root_step: %s ", sline, root_step);

                transposed_note = this.transpose(root_step, root_alter, 0);


                root_xml = `<root>
                <root-step>` + transposed_note.step + `</root-step>\n`
                if (transposed_note.alter != 0)
                root_xml += `     <root-alter>` + transposed_note.alter + `</root-alter>\n`;

                
                root_xml += `</root>\n`;
                //console.log("root_XML: %s", root_xml);
                str_out += root_xml;
                in_root = false;
                continue;
            }
                
            if (in_root)
            {
                if (show_output)
                    console.log("IN ROOT: %s", sline);
                if (sline.indexOf("<root-step") >= 0)
                {
                    root_step = get_xml_value(sline);
                    if (show_output)
                        console.log("ROOT_STEP; %s", root_step);
                    continue;
                }
                else if (sline.indexOf("<root-alter") >= 0)
                {
                    root_alter = get_xml_number(sline);
                    if (show_output)
                        console.log("root_alter; %s", root_alter);
                    continue;
                }
                else
                    throw("Unknown ROOT line: " + sline);
            }

            

            // transpose bass
            // <bass>
            // <bass-step>A</bass-step>
            // <bass-alter>-1</bass-alter>
            // </bass>

            if (sline.indexOf("<bass>") >= 0)
            {
                if (show_output)
                    console.log("START BASS %s", sline);
                in_bass = true;
                bass_alter = "";
                bass_step = "";
                continue;
            }
                
            
            if (sline.indexOf("</bass>") >= 0)
            {
                if (show_output)
                    console.log("END %s bass_step: %s ", sline, bass_step);

                transposed_note = this.transpose(bass_step, bass_alter, 0);


                bass_xml = `<bass>
                    <bass-step>` + transposed_note.step + `</bass-step>\n`;
                if (transposed_note.alter != 0)
                bass_xml += `     <bass-alter>` + transposed_note.alter + `</bass-alter>\n`;

                
                bass_xml += `</bass>\n`;
                if (show_output)
                    console.log("bass_XML: %s", bass_xml);
                str_out += bass_xml;
                in_bass = false;
                continue;
            }
                
            if (in_bass)
            {
                if (show_output)
                    console.log("IN bass: %s", sline);
                if (sline.indexOf("<bass-step") >= 0)
                {
                    bass_step = get_xml_value(sline);
                    if (show_output)
                        console.log("bass_STEP; %s", bass_step);
                    continue;
                        }
                else if (sline.indexOf("<bass-alter") >= 0)
                {
                    bass_alter = get_xml_number(sline);
                    if (show_output)
                        console.log("bass_alter; %s", bass_alter);
                    continue;
                }
                else
                    throw("Unknown bass line: " + sline);
            }

            
            

            str_out += sline + "\n";


            
        }

        xml_string_out = str_out;
        console.log("NEW xml_string_out length: %s", xml_string_out.length);



        return(xml_string_out);
    }

    // scan from <step>D</step>
    function get_xml_value(sline)
    {
        ipos = sline.indexOf("<");
        if (ipos < 0)
            return("");

        stext = sline.substr(ipos);
        // skip first <>
        ipos2 = stext.indexOf(">");
        stext = stext.substr(ipos2+1);
        ipos3 = stext.indexOf("<");
        stext = stext.substr(0, ipos3);
        return(stext);
    }

    function get_xml_number(sline)
    {
        value = get_xml_value(sline);
        return (Number(value));
    }

