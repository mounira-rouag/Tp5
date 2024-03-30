package com.example.Project.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name="`MAJ`")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class Maj {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`IdMaj`")
    private int idMaj;

    @Column(name = "`NomMaj`")
    private String nomMaj;

    @Column(name = "`TypeMaj`")
    private String typeMaj;

    @Column(name = "`StatusMaj`")
    private String statusMaj;

    @Column(name = "`Ordre`")
    private Short ordre;

    @Column(name = "`EnCours`")
    private Boolean enCours;

    @Column(name = "`AtalMaj`", length = 10)
    private String atalMaj;

    @Column(name = "`NomMajOffice`", length = 50)
    private String nomMajOffice;

    @JsonIgnore
    @OneToMany(mappedBy = "maj")
    private List<Dev> dev;

}
