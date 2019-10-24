<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <HTML>
            <BODY>
                <h1> Juegos </h1>
                <BR/>
                <BR/>
                <xsl:apply-templates select="colection/game"/>
            </BODY>
        </HTML>
    </xsl:template>

    <xsl:template match="colection/game">
        <H2><xsl:value-of select="@title"/></H2>
        <BR/>
        <IMG>
            <xsl:attribute name="src">
                <xsl:value-of select="picture/@src"/>
            </xsl:attribute>
        </IMG>
        <P><xsl:value-of select="description"/></P>
        <B>Plataforma: </B><xsl:value-of select="@type"/>
    </xsl:template>
</xsl:stylesheet>