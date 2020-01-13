<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <xsl:for-each select="colection/game">
            <xsl:if test="@id = 1">
                <div class="container-fluid row justify-content-center no-gutters no-padding mb-5">
                    <div class="container no-gutters no-padding row justify-content-center p-3 pb-4">
                        <h2><xsl:value-of select="@title"/></h2>
                    </div>
                    <div class="container no-gutters no-padding">
                        <div class="container-fluid row justify-content-around">
                            <div class="col-6 row justify-content-center">
                                <img style="border: 1px solid #333333">
                                    <xsl:attribute name="src">
                                        <xsl:value-of select="picture/@src"/>
                                    </xsl:attribute>
                                </img>
                            </div>
                            <div class="col-6 pt-5">
                                <h3>SINOPSIS</h3>
                                <p class="text-justify">
                                    <xsl:value-of select="description"/>
                                </p>
                            </div>
                        </div>
                        <div class="container row justify-content-between">
                            <div class="container-fluid no-gutters no-padding p-3 pr-5 col-6">
                                <p class="game-info-size no-gutters text-justify"><span class="game-info">Lanzamiento: </span> <xsl:value-of select="@year"/></p>
                                <br/>
                                <p class="game-info-size no-gutters text-justify"><span class="game-info">Plataforma: </span> <xsl:value-of select="@type"/></p>
                                <br/>
                                <p class="game-info-size no-gutters text-justify"><span class="game-info">Desarrollador: </span> <xsl:value-of select="@dv"/></p>
                                <br/>
                                <p class="game-info-size no-gutters text-justify"><span class="game-info">Distribuidor: </span> <xsl:value-of select="@dt"/></p>
                            </div>
                            <div class="container-fluid col-6">
                                <table class="table">
                                    <thead style="background-color: #022F3D;">
                                        <tr class="border border-dark">
                                            <th class="text-center" style="color: white; font-size: 19px;" scope="col" colspan="2">Análisis de los usuarios</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="border border-dark">
                                                <p id="porc-positivos" class="text-center no-gutters" style="font-size: 32px; color:#55CF56;">V</p>
                                                <br/>
                                                <p class="text-center" style="font-size: 21px;">positivos</p>
                                            </td>
                                            <td class="border border-dark">
                                                <p id="porc-negativos" class="text-center no-gutters" style="font-size: 32px; color:#E82611;">V</p>
                                                <br/>
                                                <p class="text-center" style="font-size: 21px;">negativos</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="container">
                                    <p id="valoraciones-totales" style="font-size: 18px;">V</p>
                                </div>
                            </div>
                        </div>
                        <div class="container no-gutters no-padding row p-4 mt-2">
                            <div class="col pb-4">
                                <h2 class="float-left">INFORMACIÓN SOBRE LOS TROFEOS</h2>
                            </div>
                            <div id="lista-trofeos" class="container row">V</div>
                        </div>
                    </div>
                </div>

                <!-- Ejecutamos la lectura de la base de datos de firebase -->
                <script>
                    get_valorations('valoraciones_juegos',1);
                    get_trophies(1);
                </script>
            </xsl:if>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>