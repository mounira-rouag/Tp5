package com.example.Project.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Data
@Table(name = "`DEV`")
public class Dev {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`IdDev`")
    private int id;
    @Column(name = "`NomDev`")
    private String devname;
    @Column(name = "`NomDLL`")
    private String dll;
    @Column(name = "`DevDuplique`")
    private boolean devDuplique;
    @Column(name = "`DevComment`")
    private String devComment;
    @Column(name = "`NumBugzilla`")
    private String numBug;


    @ManyToOne
    @JoinColumn(name = "`IdCDC`")
    private CDC cdc;


    @ManyToOne
    @JoinColumn(name = "`IdEcu`")
    private Ecu ecu;

    @ManyToOne
    @JoinColumn(name = "`IdMaj`")
    private Maj maj;

    @ManyToOne
    @JoinColumn(name = "`IdEtatDev`")
    private EtatDev etatdev;

    @ManyToOne
    @JoinColumn(name = "`IdMenu`")
    private Menu menu;

    public Maj getMaj() {
        return maj;
    }

    @ManyToOne
    @JoinColumn(name = "`IdRC`")
    private User user;

    @ManyToMany
    @JoinTable(  name = "`VEH_BY_DEV`",
            joinColumns = @JoinColumn(name = "`IdDev`"),
            inverseJoinColumns ={ @JoinColumn(name = "`GRPMOD`"),

                                }
    )
    private List<Vehicule> vehicules;

@JsonIgnore
    @ManyToMany
    @JoinTable(  name = "`FCT_BY_DEV`",
            joinColumns = @JoinColumn(name = "`IdFonction`"),
            inverseJoinColumns ={ @JoinColumn(name = "`IdDev`"),

            }
    )
    private List<Fonction> fonctions;


    @ManyToMany
    @JoinTable(  name = "`VALID_BY_DEV`",
            joinColumns = @JoinColumn(name = "`IdValid`"),
            inverseJoinColumns ={ @JoinColumn(name = "`IdDev`"),

            }
    )
    private List<Validation> validations;

}
