<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <div class="container-fluid row justify-content-center no-gutters no-padding mb-5">
            <div class="container no-gutters no-padding row justify-content-center p-3">
                <h2>¡Estos son los juegos que tenemos a tú disposición!</h2>
            </div>
            <div class="container no-gutters no-padding row">
                <xsl:for-each select="colection/game">
                    <div class="m-1">
                        <a href="#">
                            <img class="game-image">
                                <xsl:attribute name="src">
                                    <xsl:value-of select="picture/@src"/>
                                </xsl:attribute>
                            </img>
                        </a>
                    </div>
                </xsl:for-each>
            </div>
        </div>
    </xsl:template>
</xsl:stylesheet>