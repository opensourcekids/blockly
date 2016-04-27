<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        xmlns:xs="http://www.w3.org/2001/XMLSchema"
        exclude-result-prefixes="xs"
        version="1.0">

    <xsl:template match="/">
        <html>
            <body>
                <h2>Block Categories</h2>
                <table border="1">
                    <tr bgcolor="#9acd32">
                        <th style="text-align:left">Category</th>
                        <th style="text-align:left">Blocks</th>
                    </tr>
                    <xsl:for-each select="xml/category">
                        <tr>
                            <td>
                                <xsl:value-of select="@name"/>
                            </td>
                            <td>

                            </td>
                        </tr>
                        <xsl:for-each select="block">
                            <tr>
                                <td>

                                </td>
                                <td>
                                    <xsl:value-of select="@type"/>
                                </td>
                            </tr>
                        </xsl:for-each>

                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>